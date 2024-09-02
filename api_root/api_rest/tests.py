from django.test import TestCase
from django.utils import timezone
from .models import Job, Image
from .serializers import JobSerializer, ImageSerializer
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status


# Create your tests here.

#######################################################  Teste Models  ###################################################################
class JobModelTest(TestCase):
    
    def setUp(self):
        """
        Cria uma instância de Job para ser usada nos testes.
        """
        self.job = Job.objects.create(
            job_name='Test Job',
            job_description='This is a test job description.'
        )

    def test_job_creation(self):
        """
        Verifica se o Job é criado corretamente com os atributos esperados.
        """
        job = self.job
        self.assertEqual(job.job_name, 'Test Job')
        self.assertTrue(isinstance(job.job_create_at, timezone.datetime))
        self.assertEqual(job.job_description, 'This is a test job description.')

    def test_job_create_at_auto_now_add(self):
        """
        Verifica se o campo job_create_at é preenchido automaticamente.
        """
        job = Job.objects.create(
            job_name='Another Test Job',
            job_description='Another test job description.'
        )
        self.assertIsNotNone(job.job_create_at)
        self.assertTrue(job.job_create_at <= timezone.now())

class ImageModelTest(TestCase):

    def setUp(self):
        """
        Cria uma instância de Job e uma instância de Image associada a ele para ser usada nos testes.
        """
        self.job = Job.objects.create(
            job_name='Test Job',
            job_description='This is a test job description.'
        )
        self.image = Image.objects.create(
            job=self.job,
            name='test_image.png',
            type='image/png',
            content='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DH0UAAAABJRU5ErkJggg=='
        )

    def test_image_creation(self):
        """
        Verifica se a Image é criada corretamente com os atributos esperados.
        """
        image = self.image
        self.assertEqual(image.name, 'test_image.png')
        self.assertEqual(image.type, 'image/png')
        self.assertEqual(image.content, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DH0UAAAABJRU5ErkJggg==')
        self.assertEqual(image.job, self.job)

    def test_job_image_relationship(self):
        """
        Verifica se o Image está corretamente associado ao Job.
        """
        job_image = self.job.image
        self.assertEqual(job_image, self.image)


#######################################################  Teste Models  ###################################################################
        
#######################################################  Teste Serializacao  ##############################################################  

class JobSerializerTest(APITestCase):
    def setUp(self):
        self.job = Job.objects.create(
            job_name='Test Job',
            job_description='This is a test job description.'
        )
        self.image = Image.objects.create(
            job=self.job,
            name='test_image.png',
            type='image/png',
            content='base64encodedcontent'
        )
        self.job_data = {
            'job_name': 'Updated Job Name',
            'job_description': 'Updated job description.',
            'image': {
                'name': 'new_image.png',
                'type': 'image/jpeg',
                'content': 'newbase64encodedcontent'
            },
            'del_image': False
        }
        self.serializer = JobSerializer(instance=self.job, data=self.job_data, partial=True)
        self.serializer_image = JobSerializer(instance=self.job)

    def test_job_serializer_fields(self):
        data = self.serializer_image.data
        self.assertEqual(set(data.keys()), {'id', 'job_name', 'job_create_at', 'job_description', 'image'})
        self.assertEqual(data['job_name'], 'Test Job')
        self.assertEqual(data['job_description'], 'This is a test job description.')
        self.assertEqual(data['image']['name'], 'test_image.png')
        self.assertEqual(data['image']['type'], 'image/png')
        self.assertEqual(data['image']['content'], 'base64encodedcontent')

    def test_job_serializer_create(self):
        data = {
            'job_name': 'New Job',
            'job_description': 'Description of new job.',
            'image': {
                'name': 'new_image.png',
                'type': 'image/jpeg',
                'content': 'newbase64encodedcontent'
            }
        }
        serializer = JobSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        job = serializer.save()
        self.assertEqual(Job.objects.count(), 2)
        self.assertEqual(Image.objects.count(), 2)
        self.assertEqual(job.job_name, 'New Job')

    def test_job_serializer_update(self):
        update_data = {
            'job_name': 'Updated Job Name',
            'del_image': True
        }
        serializer = JobSerializer(instance=self.job, data=update_data, partial=True)
        self.assertTrue(serializer.is_valid())
        updated_job = serializer.save()
        self.assertEqual(updated_job.job_name, 'Updated Job Name')
        self.assertFalse(Image.objects.filter(job=self.job).exists()) #instancia da imagem foi deletada

    def test_job_serializer_validation(self):
        invalid_data = {
            'job_name': '',
            'job_description': '',
            'image': {
                'name': '',
                'type': '',
                'content': ''
            }
        }
        serializer = JobSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), {'job_name', 'job_description', 'image'})

#######################################################  Teste Serializacao  ############################################################## 
         
#######################################################  Teste Views  ##############################################################  
        
class GetImageByFKTest(APITestCase):
    def setUp(self):
        """
        Configura o ambiente de teste criando uma instância de Job e uma imagem associada.
        """
        self.job = Job.objects.create(
            job_name='Test Job',
            job_description='This is a test job description.'
        )
        self.image = Image.objects.create(
            job=self.job,
            name='test_image.png',
            type='image/png',
            content='base64encodedcontent'
        )
        self.url = reverse('get_image_by_fk')  # Assumindo que você tem um nome para a URL

    def test_get_image_by_fk_success(self):
        """
        Testa a obtenção da imagem com um job_id válido.
        """
        response = self.client.get(self.url, {'job_id': self.job.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'test_image.png')
        self.assertEqual(response.data['type'], 'image/png')
        self.assertEqual(response.data['content'], 'base64encodedcontent')

    def test_get_image_by_fk_no_job_id(self):
        """
        Testa a resposta quando o job_id não é fornecido.
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'detail': 'job_id is required.'})

    def test_get_image_by_fk_image_not_found(self):
        """
        Testa a resposta quando o job_id não tem uma imagem associada.
        """
        response = self.client.get(self.url, {'job_id': 9999})  # ID que não existe
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class JobManagerTests(APITestCase):

    def setUp(self):
        self.job1 = Job.objects.create(job_name="Job 1", job_description="Descrição do Job 1")
        self.job2 = Job.objects.create(job_name="Job 2", job_description="Descrição do Job 2")
        self.image1 = Image.objects.create(job=self.job1, name="Image 1", type="png", content="content")
        self.job_url = reverse('job_manager')

    def test_get_all_jobs(self):
        # Testa a busca de todos os Jobs
        response = self.client.get(self.job_url, {'all': 'true'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Verifica se retornou os dois jobs

    def test_get_single_job(self):
        # Testa a busca de um único Job pelo ID
        response = self.client.get(self.job_url, {'id': self.job1.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['job_name'], self.job1.job_name)

    def test_get_job_with_image(self):
        # Testa a busca de um Job com a imagem associada
        response = self.client.get(self.job_url, {'id': self.job1.id, 'include_image': 'true'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('image', response.data)

    def test_get_job_not_found(self):
        # Testa a busca de um Job que não existe
        response = self.client.get(self.job_url, {'id': 9999}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_job(self):
        # Testa a criação de um novo Job
        data = {'job_name': 'New Job', 'job_description': 'New Job Description'}
        response = self.client.post(self.job_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Job.objects.count(), 3)

    def test_update_job(self):
        # Testa a atualização de um Job existente
        data = {'id': self.job1.id, 'job_name': 'Updated Job', 'job_description': 'Updated Description'}
        response = self.client.put(self.job_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.job1.refresh_from_db()
        self.assertEqual(self.job1.job_name, 'Updated Job')

    def test_delete_job(self):
        # Testa a exclusão de um Job
        response = self.client.delete(self.job_url, {'id': self.job1.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(Job.objects.count(), 1)

    def test_delete_job_not_found(self):
        # Testa a tentativa de excluir um Job que não existe
        response = self.client.delete(self.job_url, {'id': 9999}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
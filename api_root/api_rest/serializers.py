from rest_framework import serializers

from .models import Job, Image

#Denie como os dados serao buscados e implementados no banco

class ImageSerializer(serializers.ModelSerializer):

    """
    Serializer para o modelo Image.

    Este serializer transforma instâncias do modelo Image em representações JSON e vice-versa.

    Meta:
    -----
    model : Image
        O modelo que este serializer serializa.
    fields : list
        Os campos do modelo Image que serão incluídos na serialização: 
        - 'name': Nome do arquivo de imagem.
        - 'type': Tipo MIME do arquivo.
        - 'content': Conteúdo da imagem em formato Base64.
        - 'job_id': Chave estrangeira da tabela Job.
    """

    class Meta:
        model = Image
        fields = ['name', 'type', 'content']





#lida com put, get e delele
class JobSerializer(serializers.ModelSerializer):

    """
    Serializer para o modelo Job com suporte opcional para imagem associada e remoção de imagem.

    Atributos:
    ----------
    image : ImageSerializer, optional
        Serializer para a imagem associada ao Job. Este campo é opcional e pode ser incluído ou removido
        dependendo da configuração do serializer.
    del_image : BooleanField, optional
        Campo booleano que indica se a imagem associada deve ser removida. Este campo é opcional e
        só é relevante quando se deseja remover a imagem associada ao Job. Caso o campo imagem seja enviado,
        junto, o delete surte o mesmo efeito.

    Meta:
    -----
    model : Job
        O modelo que este serializer está configurado para serializar.
    fields : list
        Lista de campos do modelo Job a serem incluídos na serialização. Inclui:
        - 'id': ID do Job.
        - 'job_name': Nome do Job.
        - 'job_create_at': Data e hora de criação do Job.
        - 'job_description': Descrição do Job.
        - 'image': Serializer da imagem associada (se aplicável).
        - 'del_image': Flag para remover a imagem associada (se aplicável).
    """

    image = ImageSerializer(required=False) 
    del_image = serializers.BooleanField(required=False)


    class Meta:
        model = Job
        fields = ["id", "job_name", "job_create_at", "job_description", "image", "del_image"]


    def __init__(self, *args, **kwargs):

        """
        Inicializa o serializer com a opção de incluir ou não o campo 'image'.
        
        """

        include_image = kwargs.pop('include_image', True)
        super().__init__(*args, **kwargs)
       
        if  include_image == False:
            self.fields.pop('image', None)


    #ocorre uma inconssitencia pois falta 
    def create(self, validated_data):

        """
        Cria um novo Job e, se fornecida, uma imagem associada.
       
        """
        image_data = validated_data.pop('image', None)
        
        job = Job.objects.create(**validated_data)
        
        if image_data:
            Image.objects.create(job=job, **image_data)
        
        return job

    def update(self, instance, validated_data):

        """
        Atualiza um Job existente, com suporte para adicionar ou remover a imagem associada.
        
        """

        instance.job_name = validated_data.get('job_name', instance.job_name)
        instance.job_description = validated_data.get('job_description', instance.job_description)

        del_image = validated_data.pop('del_image', False) 
        image_data = validated_data.pop('image', None)
        
        
        if del_image:
    
            if hasattr(instance, 'image'):
                instance.image.delete()
        
        elif image_data:

            if hasattr(instance, 'image'):
                image_instance = instance.image 
                image_instance.name = image_data.get('name', image_instance.name)
                image_instance.type = image_data.get('type', image_instance.type)
                image_instance.content = image_data.get('content', image_instance.content)
                image_instance.save()
            else:
                Image.objects.create(job=instance, **image_data)


        instance.save()
        return instance   
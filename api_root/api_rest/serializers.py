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
        fields = ['name', 'type', 'content', 'job_id']



class JobSerializerB(serializers.ModelSerializer):

    """
    Serializer para o modelo Job, com suporte opcional para imagem associada e remoção de imagem.

    Atributos:
    ----------
    image : ImageSerializer
        Serializer para a imagem associada ao Job, opcional.
    del_image : BooleanField
        Campo booleano para indicar se a imagem associada deve ser removida, opcional.
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

        include_image = kwargs.pop('include_image', False)
        super().__init__(*args, **kwargs)
        
        if not include_image:
            self.fields.pop('image', None)


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
                image_instance.save()
            else:
                Image.objects.create(job=instance, **image_data)


        instance.save()
        return instance   
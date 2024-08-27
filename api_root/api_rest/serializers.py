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
    """

    class Meta:
        model = Image
        fields = ["name", "type", 'content']
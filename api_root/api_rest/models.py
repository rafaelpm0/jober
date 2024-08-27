from django.db import models


class Job(models.Model):

    """
    Modelo que representa um trabalho (Job).

    Atributos:
    ----------
    job_name : CharField
        Nome do trabalho, obrigatório, com comprimento máximo de 350 caracteres.
    
    job_create_at : DateTimeField
        Data e hora da criação do trabalho, automaticamente preenchido no momento da criação.
    
    job_description : CharField
        Descrição do trabalho, obrigatório, com comprimento máximo de 3000 caracteres.
    """

    job_name = models.CharField(max_length=350, blank=False, null=False)
    job_create_at = models.DateTimeField(auto_now_add=True)
    job_description = models.CharField(max_length=3000, blank=False, null=False)

    def __str__(self):

        return f'Job: {self.job_name}'


class Image(models.Model):
    
    """
    Modelo que representa uma imagem associada a um trabalho (Job).

    Atributos:
    ----------
    job : ForeignKey
        Chave estrangeira que referencia o trabalho (Job) associado. Se o Job for excluído, a imagem também será removida.
   
    name : CharField
        Nome do arquivo de imagem, com comprimento máximo de 350 caracteres.
   
    type : CharField
        Tipo MIME do arquivo, com comprimento máximo de 50 caracteres.
    content : TextField
        Conteúdo da imagem em formato Base64.
    """

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name='job'
    )

    name = models.CharField(max_length=350) 
    type = models.CharField(max_length=50)  
    content = models.TextField()  

    def __str__(self):
        return f"{self.name} ({self.job.name})"    



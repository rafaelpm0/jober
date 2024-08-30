from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Job, Image
from .serializers import JobSerializer, ImageSerializer

# Create your views here.

# busca da imagem
@api_view(["GET"])
def get_image_by_fk(request):

    """
    Obtém a imagem associada a um trabalho (Job) com base no job_id fornecido na query string.

    Parâmetros da Query String:
    ---------------------------
    job_id : int
        ID do trabalho (Job) associado à imagem.

    Respostas:
    ----------
    200 OK
        Se a imagem for encontrada e serializada com sucesso.
    400 Bad Request
        Se o job_id não for fornecido ou se ocorrer um erro inesperado.
    404 Not Found
        Se a imagem não for encontrada para o job_id fornecido.
    """

    # Obtém o job_id que consta no parametro da url
    job_id = request.query_params.get('job_id', None)

    if job_id is None:
        return Response({"detail": "job_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    # Realize a busca da imagem
    try:
        image = Image.objects.get(job_id=job_id)
  
    except Image.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        
        serializer = ImageSerializer(image)
        return Response(serializer.data)

    return Response(status=status.HTTP_400_BAD_REQUEST)


# Criacao, edicao, delete e atualicao de itens do job
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def job_manager(request):

    """
    Gerencia operações CRUD para o modelo Job.

    Tipos de Requisição:
    --------------------
    GET
        - Parâmetros:

          - 'id' (opcional): ID do Job específico para retornar.
          - 'all' (opcional, default='false'): Se 'true', retorna todos os Jobs.
          - 'include_image' (opcional, default='false'): Se 'true', inclui a imagem associada no retorno.
          - 'inst_img' (opcional, default='false'): Se 'true', verifique a existencia da imagem associada no retorno.

        - Retorna:

          - 200 OK: Dados do Job ou lista de Jobs.
          - 400 Bad Request: Erro de formato de ID ou erro inesperado.
          - 404 Not Found: Job não encontrado.

    POST

        - Parâmetros:
          - 'id': ID do Job a ser atualizado.
          - 'del_image' (opcional, default=False): Se 'true', a imagem associada ao Job será excluída. (No corpo da requisicao)
          - Dados do Job e Image no corpo da requisição.
        
        - Retorna:
          - 201 Created: Job criado com sucesso.
          - 400 Bad Request: Dados inválidos.

    PUT
        - Parâmetros:

          - 'id': ID do Job a ser atualizado.
          - Dados atualizados do Job no corpo da requisição.

        - Retorna:

          - 202 Accepted: Job atualizado com sucesso.
          - 400 Bad Request: Dados inválidos ou erro de requisição.
          - 404 Not Found: Job não encontrado.

    DELETE

        - Parâmetros:

          - 'id': ID do Job a ser excluído.

        - Retorna:
          - 202 Accepted: Job excluído com sucesso.
          - 400 Bad Request: ID não fornecido.
          - 404 Not Found: Job não encontrado.
    """



    #Get via id
    if  request.method == 'GET':
        
        try:
            #parametros do GET
            all_param = request.query_params.get('all', 'false').lower() == 'true' #Buscar todos
            img_param = request.query_params.get('include_image', 'false').lower() == 'true' #buscar imagem
            id_param = request.query_params.get('id')  # pesquisa via id
            instance_image_param = request.query_params.get('inst_img', 'false').lower() == 'true'   #verificar instancia de imagem
            #Busca via ID
            if id_param:
                
                try:
                    id_param = int(id_param)
                    job = Job.objects.get(pk=id_param)

                    #Serializacao com os parametros de incluir e verificar instancia de imagem
                    serializer = JobSerializer(job, include_image=img_param, inst_img=instance_image_param)
                    return Response(serializer.data)
                
                except ValueError:
                    return Response({'detail': 'Invalid ID format'}, status=status.HTTP_400_BAD_REQUEST)
                
                except Job.DoesNotExist:
                    return Response({'detail': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)
            
            #Busca todos
            elif all_param :
                try:
                    job = Job.objects.all()
                    serializer = JobSerializer(job, many=True, include_image=img_param, inst_img=instance_image_param)
                
                except ValueError:
                    return Response({'detail': 'Invalid ID format'}, status=status.HTTP_400_BAD_REQUEST)
                
                except Job.DoesNotExist:
                    return Response({'detail': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

            return Response(serializer.data)

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)  

    #Post
    if request.method == "POST":
    
        news_job = request.data
        serializer = JobSerializer(data=news_job, include_image=True,  inst_img=True)
        
        if serializer.is_valid():
            job = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

        return Response(status=status.HTTP_400_BAD_REQUEST)
    

    # atualicao do job
    if request.method == "PUT":

        try:
            id = request.data['id']
        
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            updated_job = Job.objects.get(pk=id)
       
        except:
            return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)

        
        serializer = JobSerializer(updated_job, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    # delete 
    
    if request.method == "DELETE":

        try:
            
            try:
                delete_id = request.data['id']
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)    
            
            job_to_delete = Job.objects.get(pk=delete_id)    
            job_to_delete.delete() 
            return Response(status=status.HTTP_202_ACCEPTED)
        
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
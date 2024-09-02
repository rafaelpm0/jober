from django.urls import path

from . import views

# define o restante do url da api e o parametros da url
urlpatterns = [
    path('img/', views.get_image_by_fk, name='get_image_by_fk'),  # get por id tabela Job
    path('job/', views.job_manager, name='job_manager'),
]


from django.contrib import admin
from django.urls import path

from . import views
from imageAPI.views import imageEndPoint
urlpatterns = [
        path('', views.usersView.as_view(), name='userView'),  # to GET all users and POST a new user
        path('<int:pk>/', views.userView.as_view(), name='userView'),  # to GET a single user
        path('<int:pk>/images/', imageEndPoint.as_view(), name='userImagesView'),  # to endpoint that interact with IMAGES
]


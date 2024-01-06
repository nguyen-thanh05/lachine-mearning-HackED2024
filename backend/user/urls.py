
from django.contrib import admin
from django.urls import path

from . import views
urlpatterns = [
        path('', views.userView.as_view(), name='userView'),
]

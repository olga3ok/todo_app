from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import filters
from .models import Todo, Category
from .serializers import TodoSerializer, CategorySerializer


class TodoViewSet(viewsets.ModelViewSet):
    """API для управления задачами"""
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['completed']

class CategoryViewSet(viewsets.ModelViewSet):
    """API для управления категориями"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


from rest_framework import serializers
from .models import Todo, Category

class CategorySerializer(serializers.ModelSerializer):
    """Сериализатор для Category"""
    class Meta:
        model = Category
        fields = '__all__'

class TodoSerializer(serializers.ModelSerializer):
    """Сериализатор для Todo"""
    category = CategorySerializer()

    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'due_date', 'completed', 'category']

    # Переопределение метода для обработки объекта категории
    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category, _ = Category.objects.get_or_create(**category_data)
        todo = Todo.objects.create(category=category, **validated_data)
        return todo

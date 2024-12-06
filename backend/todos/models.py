from django.db import models


class Category(models.Model):
    """Модель для категорий задач"""
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

class Todo(models.Model):
    """Модель для задач"""
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True)
    completed = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='todos', null=True, blank=True)

    def __str__(self):
        return self.title

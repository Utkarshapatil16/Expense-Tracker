from django.urls import path
from .import views

urlpatterns = [
    path('',views.get_expenses),
    path('add/',views.add_expense),
    path('delete/<int:id>/',views.delete_expense),
]
from django.shortcuts import render
from .models import Expense

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Expense
from .serializers import ExpenseSerializer

@api_view(['GET'])
def get_expenses(request,id):
    expenses = Expense.objects.all()
    serializer = ExpenseSerializer(expenses,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_expense(request):
    serializer = ExpenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['DELETE'])
def delete_expense(request,id):
    expense = Expense.objects.get(id=id)
    expense.delete()
    return Response({"message": "Deleted"})



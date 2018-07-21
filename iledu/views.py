from userapp.views import login_required, super_admin_required, supervisor_required

from django.shortcuts import render_to_response
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from userapp.models import User
#@login_required
def index(request):
    nickname = request.session.get('nickname', None)
    user = User.objects.get(pk=nickname) if User.objects.filter(pk=nickname).exists() else None
    return render(request, 'index.html', {'user': user})

def page_error(request):
    return render_to_response('400.html')


def page_not_found(request):
    return render_to_response('404.html')


def server_error(request):
    return render_to_response('500.html')


def page_forbidden(request):
    return render_to_response('403.html')

def postdata(request):
    data = request.POST["username"]
    print(data)
    return JsonResponse({'code': -1, 'message': 'aaaaaaaaa','aa':data})

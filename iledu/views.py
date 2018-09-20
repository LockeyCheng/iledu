from userapp.views import login_required, super_admin_required, supervisor_required
import os
from django.shortcuts import render_to_response,render
from django.http import JsonResponse, HttpResponse
from userapp.models import User
from  django.template import RequestContext
import json
#@login_required

def article(request):
    return render(request, 'article_edit.html', {'user': 'lockey23'})

def get_oo(request):
    json_data = json.loads(request.body)
    oofile = json_data['filepath']
    data = {}
    basepath = '/root/LockeyCheng.github.io/iledu/The_Economist/a2018/a8'
    fullpath = os.path.join(basepath,oofile+'.json')

    if not os.path.exists(fullpath):
        return JsonResponse({'data': []}, safe=False)

    with open(fullpath, 'r')as fo:
        data = json.load(fo)


    return JsonResponse({'data':data}, safe=False)


def post_oo(request):
    json_data = json.loads(request.body)
    oofile = json_data['file']
    oodata = json_data['data']
    basepath = '/root/LockeyCheng.github.io/iledu/The_Economist/a2018/a8'
    fullpath = os.path.join(basepath, oofile + '.json')
    with open(fullpath, 'w')as fo:
        json.dump(oodata,fo)

    if not os.path.exists(fullpath):
        return JsonResponse({'code':0}, safe=False)
    else:
        return JsonResponse({'code':-1}, safe=False)

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

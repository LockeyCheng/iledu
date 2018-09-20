"""iledu URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  re_path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  re_path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, re_path
    2. Add a URL to urlpatterns:  re_path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.conf.urls import handler400, handler404, handler500, handler403
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('index', views.index, name='index'),
    path('account/', include('userapp.urls')),
    path('postdata/',views.postdata,name='postdata'),
    path('article', views.article, name='article'),
    path('get_oo', views.get_oo, name='get_oo'),
    path('post_oo', views.post_oo, name='post_oo'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

handler404 = views.page_error
handler404 = views.page_not_found
handler500 = views.server_error
handler403 = views.page_forbidden

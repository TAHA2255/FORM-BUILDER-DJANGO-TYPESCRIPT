from django.urls import path, include

from widget import views


WIDGET_PATTERNS = [
    path(
        "<uuid:pk>/retrieve/",
        views.WidgetRetrieveAPIView.as_view(),
        name="widget-retrieve"
    ),
    path(
        "<uuid:pk>/html/",
        views.WidgetHtmlRetrieveAPIView.as_view(),
        name="widget-html"
    ),
    path("list/", views.WidgetListAPIView.as_view(), name="widget-list"),
    path("create/", views.WidgetCreateAPIView.as_view(), name="widget-create"),
    path(
        "<uuid:pk>/update/",
        views.WidgetUpdateAPIView.as_view(),
        name="widget-update"
    ),
    path(
        "<uuid:pk>/delete/",
        views.WidgetDeleteAPIView.as_view(),
        name="widget-delete"
    )
]


DATA_PATTERNS = [
    path('list/', views.DataListAPIView.as_view(), name='data-list'),
    path('create/', views.DataCreateAPIView.as_view(), name='data-create')
]

DATA_FILES_PATTERNS = [
    path('create/', views.DataFileCreateAPIView.as_view(), name='data-files-create')
]


urlpatterns = [
    path("embed-code/", include(WIDGET_PATTERNS)),
    path("data/<uuid:widget_id>/", include(DATA_PATTERNS)),
    path("data-files/", include(DATA_FILES_PATTERNS))
]

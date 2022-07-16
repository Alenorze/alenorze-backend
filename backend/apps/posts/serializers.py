from rest_framework import serializers

from versatileimagefield.serializers import VersatileImageFieldSerializer

from .models import Post, PostImage


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = '__all__'

    image = VersatileImageFieldSerializer(
        sizes=[
            ('full_size', 'url'),
            ('thumbnail', 'thumbnail__100x100'),
            ('medium_square_crop', 'crop__400x400'),
            ('small_square_crop', 'crop__50x50')
        ]
    )


class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(source='postimage_set', many=True)

    class Meta:
        model = Post
        fields = '__all__'

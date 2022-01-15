from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsCommenterOrPostPermissions(BasePermission):
    """
    Allow access to commenter and post access to other users.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS or request.method=='POST':
            return True
        is_commenter = request.user == obj.commenter

        return is_commenter
import { __assign, __decorate, __extends } from "tslib";
import { FormArray } from '@angular/forms';
import { FieldType } from './field.type';
import { clone, assignFieldValue, getFieldValue } from '../utils';
import { registerControl, unregisterControl } from '../extensions/field-form/utils';
import { Directive } from '@angular/core';
var FieldArrayType = /** @class */ (function (_super) {
    __extends(FieldArrayType, _super);
    function FieldArrayType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldArrayType.prototype.onPopulate = function (field) {
        if (!field.formControl && field.key) {
            registerControl(field, new FormArray([], { updateOn: field.modelOptions.updateOn }));
        }
        field.fieldGroup = field.fieldGroup || [];
        var length = field.model ? field.model.length : 0;
        if (field.fieldGroup.length > length) {
            for (var i = field.fieldGroup.length - 1; i >= length; --i) {
                unregisterControl(field.fieldGroup[i]);
                field.fieldGroup.splice(i, 1);
            }
        }
        for (var i = field.fieldGroup.length; i < length; i++) {
            var f = __assign(__assign({}, clone(field.fieldArray)), { key: "" + i });
            field.fieldGroup.push(f);
        }
    };
    FieldArrayType.prototype.add = function (i, initialModel, _a) {
        var markAsDirty = (_a === void 0 ? { markAsDirty: true } : _a).markAsDirty;
        i = i == null ? this.field.fieldGroup.length : i;
        if (!this.model) {
            assignFieldValue(this.field, []);
        }
        this.model.splice(i, 0, initialModel ? clone(initialModel) : undefined);
        this._build();
        markAsDirty && this.formControl.markAsDirty();
    };
    FieldArrayType.prototype.remove = function (i, _a) {
        var markAsDirty = (_a === void 0 ? { markAsDirty: true } : _a).markAsDirty;
        this.model.splice(i, 1);
        unregisterControl(this.field.fieldGroup[i], true);
        this.field.fieldGroup.splice(i, 1);
        this.field.fieldGroup.forEach(function (f, key) { return (f.key = "" + key); });
        this._build();
        markAsDirty && this.formControl.markAsDirty();
    };
    FieldArrayType.prototype._build = function () {
        this.options.build(this.field);
        this.options.fieldChanges.next({
            field: this.field,
            value: getFieldValue(this.field),
            type: 'valueChanges',
        });
    };
    FieldArrayType = __decorate([
        Directive()
    ], FieldArrayType);
    return FieldArrayType;
}(FieldType));
export { FieldArrayType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtYXJyYXkudHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGVtcGxhdGVzL2ZpZWxkLWFycmF5LnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWxFLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzFDO0lBQThGLGtDQUFZO0lBQTFHOztJQXFEQSxDQUFDO0lBakRDLG1DQUFVLEdBQVYsVUFBVyxLQUF3QjtRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ25DLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3RGO1FBRUQsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUUxQyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1lBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7Z0JBQzFELGlCQUFpQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckQsSUFBTSxDQUFDLHlCQUFRLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUUsR0FBRyxFQUFFLEtBQUcsQ0FBRyxHQUFFLENBQUM7WUFDdEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsNEJBQUcsR0FBSCxVQUFJLENBQVUsRUFBRSxZQUFrQixFQUFFLEVBQXVDO1lBQXJDLHNFQUFXO1FBQy9DLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbEM7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsK0JBQU0sR0FBTixVQUFPLENBQVMsRUFBRSxFQUF1QztZQUFyQyxzRUFBVztRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsR0FBRyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUcsR0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRU8sK0JBQU0sR0FBZDtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLEtBQUssRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNoQyxJQUFJLEVBQUUsY0FBYztTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBcERtQixjQUFjO1FBRG5DLFNBQVMsRUFBRTtPQUNVLGNBQWMsQ0FxRG5DO0lBQUQscUJBQUM7Q0FBQSxBQXJERCxDQUE4RixTQUFTLEdBcUR0RztTQXJEcUIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJy4vZmllbGQudHlwZSc7XG5pbXBvcnQgeyBjbG9uZSwgYXNzaWduRmllbGRWYWx1ZSwgZ2V0RmllbGRWYWx1ZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlFeHRlbnNpb24gfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgcmVnaXN0ZXJDb250cm9sLCB1bnJlZ2lzdGVyQ29udHJvbCB9IGZyb20gJy4uL2V4dGVuc2lvbnMvZmllbGQtZm9ybS91dGlscyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmllbGRBcnJheVR5cGU8RiBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnID0gRm9ybWx5RmllbGRDb25maWc+IGV4dGVuZHMgRmllbGRUeXBlPEY+XG4gIGltcGxlbWVudHMgRm9ybWx5RXh0ZW5zaW9uIHtcbiAgZm9ybUNvbnRyb2w6IEZvcm1BcnJheTtcblxuICBvblBvcHVsYXRlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZykge1xuICAgIGlmICghZmllbGQuZm9ybUNvbnRyb2wgJiYgZmllbGQua2V5KSB7XG4gICAgICByZWdpc3RlckNvbnRyb2woZmllbGQsIG5ldyBGb3JtQXJyYXkoW10sIHsgdXBkYXRlT246IGZpZWxkLm1vZGVsT3B0aW9ucy51cGRhdGVPbiB9KSk7XG4gICAgfVxuXG4gICAgZmllbGQuZmllbGRHcm91cCA9IGZpZWxkLmZpZWxkR3JvdXAgfHwgW107XG5cbiAgICBjb25zdCBsZW5ndGggPSBmaWVsZC5tb2RlbCA/IGZpZWxkLm1vZGVsLmxlbmd0aCA6IDA7XG4gICAgaWYgKGZpZWxkLmZpZWxkR3JvdXAubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gZmllbGQuZmllbGRHcm91cC5sZW5ndGggLSAxOyBpID49IGxlbmd0aDsgLS1pKSB7XG4gICAgICAgIHVucmVnaXN0ZXJDb250cm9sKGZpZWxkLmZpZWxkR3JvdXBbaV0pO1xuICAgICAgICBmaWVsZC5maWVsZEdyb3VwLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gZmllbGQuZmllbGRHcm91cC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZiA9IHsgLi4uY2xvbmUoZmllbGQuZmllbGRBcnJheSksIGtleTogYCR7aX1gIH07XG4gICAgICBmaWVsZC5maWVsZEdyb3VwLnB1c2goZik7XG4gICAgfVxuICB9XG5cbiAgYWRkKGk/OiBudW1iZXIsIGluaXRpYWxNb2RlbD86IGFueSwgeyBtYXJrQXNEaXJ0eSB9ID0geyBtYXJrQXNEaXJ0eTogdHJ1ZSB9KSB7XG4gICAgaSA9IGkgPT0gbnVsbCA/IHRoaXMuZmllbGQuZmllbGRHcm91cC5sZW5ndGggOiBpO1xuICAgIGlmICghdGhpcy5tb2RlbCkge1xuICAgICAgYXNzaWduRmllbGRWYWx1ZSh0aGlzLmZpZWxkLCBbXSk7XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlbC5zcGxpY2UoaSwgMCwgaW5pdGlhbE1vZGVsID8gY2xvbmUoaW5pdGlhbE1vZGVsKSA6IHVuZGVmaW5lZCk7XG4gICAgdGhpcy5fYnVpbGQoKTtcbiAgICBtYXJrQXNEaXJ0eSAmJiB0aGlzLmZvcm1Db250cm9sLm1hcmtBc0RpcnR5KCk7XG4gIH1cblxuICByZW1vdmUoaTogbnVtYmVyLCB7IG1hcmtBc0RpcnR5IH0gPSB7IG1hcmtBc0RpcnR5OiB0cnVlIH0pIHtcbiAgICB0aGlzLm1vZGVsLnNwbGljZShpLCAxKTtcbiAgICB1bnJlZ2lzdGVyQ29udHJvbCh0aGlzLmZpZWxkLmZpZWxkR3JvdXBbaV0sIHRydWUpO1xuICAgIHRoaXMuZmllbGQuZmllbGRHcm91cC5zcGxpY2UoaSwgMSk7XG4gICAgdGhpcy5maWVsZC5maWVsZEdyb3VwLmZvckVhY2goKGYsIGtleSkgPT4gKGYua2V5ID0gYCR7a2V5fWApKTtcbiAgICB0aGlzLl9idWlsZCgpO1xuICAgIG1hcmtBc0RpcnR5ICYmIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkKCkge1xuICAgIHRoaXMub3B0aW9ucy5idWlsZCh0aGlzLmZpZWxkKTtcbiAgICB0aGlzLm9wdGlvbnMuZmllbGRDaGFuZ2VzLm5leHQoe1xuICAgICAgZmllbGQ6IHRoaXMuZmllbGQsXG4gICAgICB2YWx1ZTogZ2V0RmllbGRWYWx1ZSh0aGlzLmZpZWxkKSxcbiAgICAgIHR5cGU6ICd2YWx1ZUNoYW5nZXMnLFxuICAgIH0pO1xuICB9XG59XG4iXX0=
import { ChangeDetectorRef } from '@angular/core';
import { getFieldId, assignFieldValue, isUndefined, getFieldValue, reverseDeepMerge, defineHiddenProp, clone, } from '../../utils';
import { Subject } from 'rxjs';
/** @experimental */
var CoreExtension = /** @class */ (function () {
    function CoreExtension(config) {
        this.config = config;
        this.formId = 0;
    }
    CoreExtension.prototype.prePopulate = function (field) {
        var root = field.parent;
        this.initRootOptions(field);
        if (root) {
            Object.defineProperty(field, 'options', { get: function () { return root.options; }, configurable: true });
            Object.defineProperty(field, 'model', {
                get: function () { return (field.key && field.fieldGroup ? getFieldValue(field) : root.model); },
                configurable: true,
            });
        }
        this.getFieldComponentInstance(field).prePopulate();
    };
    CoreExtension.prototype.onPopulate = function (field) {
        var _this = this;
        this.initFieldOptions(field);
        this.getFieldComponentInstance(field).onPopulate();
        if (field.fieldGroup) {
            field.fieldGroup.forEach(function (f, index) {
                if (f) {
                    Object.defineProperty(f, 'parent', { get: function () { return field; }, configurable: true });
                    Object.defineProperty(f, 'index', { get: function () { return index; }, configurable: true });
                }
                _this.formId++;
            });
        }
    };
    CoreExtension.prototype.postPopulate = function (field) {
        this.getFieldComponentInstance(field).postPopulate();
    };
    CoreExtension.prototype.initRootOptions = function (field) {
        if (field.parent) {
            return;
        }
        var options = field.options;
        field.options.formState = field.options.formState || {};
        if (!options.showError) {
            options.showError = this.config.extras.showError;
        }
        if (!options.fieldChanges) {
            defineHiddenProp(options, 'fieldChanges', new Subject());
        }
        if (!options._hiddenFieldsForCheck) {
            options._hiddenFieldsForCheck = [];
        }
        options._markForCheck = function (f) {
            console.warn("Formly: 'options._markForCheck' is deprecated since v6.0, use 'options.detectChanges' instead.");
            options.detectChanges(f);
        };
        options.detectChanges = function (f) {
            if (f._componentRefs) {
                f._componentRefs.forEach(function (ref) {
                    // NOTE: we cannot use ref.changeDetectorRef, see https://github.com/ngx-formly/ngx-formly/issues/2191
                    var changeDetectorRef = ref.injector.get(ChangeDetectorRef);
                    changeDetectorRef.markForCheck();
                });
            }
            if (f.fieldGroup) {
                f.fieldGroup.forEach(function (f) { return f && options.detectChanges(f); });
            }
        };
        options.resetModel = function (model) {
            model = clone(model !== null && model !== void 0 ? model : options._initialModel);
            if (field.model) {
                Object.keys(field.model).forEach(function (k) { return delete field.model[k]; });
                Object.assign(field.model, model || {});
            }
            options.build(field);
            field.form.reset(model);
            if (options.parentForm && options.parentForm.control === field.formControl) {
                options.parentForm.submitted = false;
            }
        };
        options.updateInitialValue = function () { return (options._initialModel = clone(field.model)); };
        field.options.updateInitialValue();
    };
    CoreExtension.prototype.initFieldOptions = function (field) {
        reverseDeepMerge(field, {
            id: getFieldId("formly_" + this.formId, field, field['index']),
            hooks: {},
            modelOptions: {},
            templateOptions: !field.type || !field.key
                ? {}
                : {
                    label: '',
                    placeholder: '',
                    focus: false,
                    disabled: false,
                },
        });
        if (field.type !== 'formly-template' &&
            (field.template || (field.expressionProperties && field.expressionProperties.template))) {
            field.type = 'formly-template';
        }
        if (!field.type && field.fieldGroup) {
            field.type = 'formly-group';
        }
        if (field.type) {
            this.config.getMergedField(field);
        }
        if (!field['autoClear'] && !isUndefined(field.defaultValue) && isUndefined(getFieldValue(field))) {
            assignFieldValue(field, field.defaultValue);
        }
        field.wrappers = field.wrappers || [];
    };
    CoreExtension.prototype.getFieldComponentInstance = function (field) {
        var componentRef = this.config.resolveFieldTypeRef(field);
        var instance = componentRef ? componentRef.instance : {};
        return {
            prePopulate: function () { return instance.prePopulate && instance.prePopulate(field); },
            onPopulate: function () { return instance.onPopulate && instance.onPopulate(field); },
            postPopulate: function () { return instance.postPopulate && instance.postPopulate(field); },
        };
    };
    return CoreExtension;
}());
export { CoreExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5zaW9ucy9jb3JlL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2xELE9BQU8sRUFDTCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixLQUFLLEdBQ04sTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixvQkFBb0I7QUFDcEI7SUFFRSx1QkFBb0IsTUFBb0I7UUFBcEIsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQURoQyxXQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3dCLENBQUM7SUFFNUMsbUNBQVcsR0FBWCxVQUFZLEtBQTZCO1FBQ3ZDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxjQUFNLE9BQUEsSUFBSSxDQUFDLE9BQU8sRUFBWixDQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDekYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFO2dCQUNwQyxHQUFHLEVBQUUsY0FBTSxPQUFBLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBbkUsQ0FBbUU7Z0JBQzlFLFlBQVksRUFBRSxJ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S0FBNkI7UUFDN0QsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RCxJQUFNLFFBQVEsR0FBb0IsWUFBWSxDQUFDLENBQUMsQ0FBRSxZQUFZLENBQUMsUUFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXJGLE9BQU87WUFDTCxXQUFXLEVBQUUsY0FBTSxPQUFBLFFBQVEsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBbkQsQ0FBbUQ7WUFDdEUsVUFBVSxFQUFFLGNBQU0sT0FBQSxRQUFRLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQWpELENBQWlEO1lBQ25FLFlBQVksRUFBRSxjQUFNLE9BQUEsUUFBUSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFyRCxDQUFxRDtTQUMxRSxDQUFDO0lBQ0osQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQTVJRCxJQTRJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIEZvcm1seVZhbHVlQ2hhbmdlRXZlbnQsIEZvcm1seUV4dGVuc2lvbiB9IGZyb20gJy4uLy4uL21vZGVscyc7XG5pbXBvcnQge1xuICBnZXRGaWVsZElkLFxuICBhc3NpZ25GaWVsZFZhbHVlLFxuICBpc1VuZGVmaW5lZCxcbiAgZ2V0RmllbGRWYWx1ZSxcbiAgcmV2ZXJzZURlZXBNZXJnZSxcbiAgZGVmaW5lSGlkZGVuUHJvcCxcbiAgY2xvbmUsXG59IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqIEBleHBlcmltZW50YWwgKi9cbmV4cG9ydCBjbGFzcyBDb3JlRXh0ZW5zaW9uIGltcGxlbWVudHMgRm9ybWx5RXh0ZW5zaW9uIHtcbiAgcHJpdmF0ZSBmb3JtSWQgPSAwO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogRm9ybWx5Q29uZmlnKSB7fVxuXG4gIHByZVBvcHVsYXRlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgY29uc3Qgcm9vdCA9IGZpZWxkLnBhcmVudDtcbiAgICB0aGlzLmluaXRSb290T3B0aW9ucyhmaWVsZCk7XG4gICAgaWYgKHJvb3QpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmaWVsZCwgJ29wdGlvbnMnLCB7IGdldDogKCkgPT4gcm9vdC5vcHRpb25zLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZmllbGQsICdtb2RlbCcsIHtcbiAgICAgICAgZ2V0OiAoKSA9PiAoZmllbGQua2V5ICYmIGZpZWxkLmZpZWxkR3JvdXAgPyBnZXRGaWVsZFZhbHVlKGZpZWxkKSA6IHJvb3QubW9kZWwpLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmdldEZpZWxkQ29tcG9uZW50SW5zdGFuY2UoZmllbGQpLnByZVBvcHVsYXRlKCk7XG4gIH1cblxuICBvblBvcHVsYXRlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgdGhpcy5pbml0RmllbGRPcHRpb25zKGZpZWxkKTtcbiAgICB0aGlzLmdldEZpZWxkQ29tcG9uZW50SW5zdGFuY2UoZmllbGQpLm9uUG9wdWxhdGUoKTtcbiAgICBpZiAoZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgZmllbGQuZmllbGRHcm91cC5mb3JFYWNoKChmLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoZikge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCAncGFyZW50JywgeyBnZXQ6ICgpID0+IGZpZWxkLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsICdpbmRleCcsIHsgZ2V0OiAoKSA9PiBpbmRleCwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybUlkKys7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwb3N0UG9wdWxhdGUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICB0aGlzLmdldEZpZWxkQ29tcG9uZW50SW5zdGFuY2UoZmllbGQpLnBvc3RQb3B1bGF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0Um9vdE9wdGlvbnMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBpZiAoZmllbGQucGFyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IGZpZWxkLm9wdGlvbnM7XG4gICAgZmllbGQub3B0aW9ucy5mb3JtU3RhdGUgPSBmaWVsZC5vcHRpb25zLmZvcm1TdGF0ZSB8fCB7fTtcbiAgICBpZiAoIW9wdGlvbnMuc2hvd0Vycm9yKSB7XG4gICAgICBvcHRpb25zLnNob3dFcnJvciA9IHRoaXMuY29uZmlnLmV4dHJhcy5zaG93RXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLmZpZWxkQ2hhbmdlcykge1xuICAgICAgZGVmaW5lSGlkZGVuUHJvcChvcHRpb25zLCAnZmllbGRDaGFuZ2VzJywgbmV3IFN1YmplY3Q8Rm9ybWx5VmFsdWVDaGFuZ2VFdmVudD4oKSk7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLl9oaWRkZW5GaWVsZHNGb3JDaGVjaykge1xuICAgICAgb3B0aW9ucy5faGlkZGVuRmllbGRzRm9yQ2hlY2sgPSBbXTtcbiAgICB9XG5cbiAgICBvcHRpb25zLl9tYXJrRm9yQ2hlY2sgPSAoZikgPT4ge1xuICAgICAgY29uc29sZS53YXJuKGBGb3JtbHk6ICdvcHRpb25zLl9tYXJrRm9yQ2hlY2snIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjYuMCwgdXNlICdvcHRpb25zLmRldGVjdENoYW5nZXMnIGluc3RlYWQuYCk7XG4gICAgICBvcHRpb25zLmRldGVjdENoYW5nZXMoZik7XG4gICAgfTtcblxuICAgIG9wdGlvbnMuZGV0ZWN0Q2hhbmdlcyA9IChmOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSA9PiB7XG4gICAgICBpZiAoZi5fY29tcG9uZW50UmVmcykge1xuICAgICAgICBmLl9jb21wb25lbnRSZWZzLmZvckVhY2goKHJlZikgPT4ge1xuICAgICAgICAgIC8vIE5PVEU6IHdlIGNhbm5vdCB1c2UgcmVmLmNoYW5nZURldGVjdG9yUmVmLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL25neC1mb3JtbHkvbmd4LWZvcm1seS9pc3N1ZXMvMjE5MVxuICAgICAgICAgIGNvbnN0IGNoYW5nZURldGVjdG9yUmVmID0gcmVmLmluamVjdG9yLmdldChDaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZi5maWVsZEdyb3VwKSB7XG4gICAgICAgIGYuZmllbGRHcm91cC5mb3JFYWNoKChmKSA9PiBmICYmIG9wdGlvbnMuZGV0ZWN0Q2hhbmdlcyhmKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9wdGlvbnMucmVzZXRNb2RlbCA9IChtb2RlbD86IGFueSkgPT4ge1xuICAgICAgbW9kZWwgPSBjbG9uZShtb2RlbCA/PyBvcHRpb25zLl9pbml0aWFsTW9kZWwpO1xuICAgICAgaWYgKGZpZWxkLm1vZGVsKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGZpZWxkLm1vZGVsKS5mb3JFYWNoKChrKSA9PiBkZWxldGUgZmllbGQubW9kZWxba10pO1xuICAgICAgICBPYmplY3QuYXNzaWduKGZpZWxkLm1vZGVsLCBtb2RlbCB8fCB7fSk7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMuYnVpbGQoZmllbGQpO1xuICAgICAgZmllbGQuZm9ybS5yZXNldChtb2RlbCk7XG4gICAgICBpZiAob3B0aW9ucy5wYXJlbnRGb3JtICYmIG9wdGlvbnMucGFyZW50Rm9ybS5jb250cm9sID09PSBmaWVsZC5mb3JtQ29udHJvbCkge1xuICAgICAgICAob3B0aW9ucy5wYXJlbnRGb3JtIGFzIHsgc3VibWl0dGVkOiBib29sZWFuIH0pLnN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvcHRpb25zLnVwZGF0ZUluaXRpYWxWYWx1ZSA9ICgpID0+IChvcHRpb25zLl9pbml0aWFsTW9kZWwgPSBjbG9uZShmaWVsZC5tb2RlbCkpO1xuICAgIGZpZWxkLm9wdGlvbnMudXBkYXRlSW5pdGlhbFZhbHVlKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRGaWVsZE9wdGlvbnMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICByZXZlcnNlRGVlcE1lcmdlKGZpZWxkLCB7XG4gICAgICBpZDogZ2V0RmllbGRJZChgZm9ybWx5XyR7dGhpcy5mb3JtSWR9YCwgZmllbGQsIGZpZWxkWydpbmRleCddKSxcbiAgICAgIGhvb2tzOiB7fSxcbiAgICAgIG1vZGVsT3B0aW9uczoge30sXG4gICAgICB0ZW1wbGF0ZU9wdGlvbnM6XG4gICAgICAgICFmaWVsZC50eXBlIHx8ICFmaWVsZC5rZXlcbiAgICAgICAgICA/IHt9XG4gICAgICAgICAgOiB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgICAgICAgICBmb2N1czogZmFsc2UsXG4gICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoXG4gICAgICBmaWVsZC50eXBlICE9PSAnZm9ybWx5LXRlbXBsYXRlJyAmJlxuICAgICAgKGZpZWxkLnRlbXBsYXRlIHx8IChmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcyAmJiBmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcy50ZW1wbGF0ZSkpXG4gICAgKSB7XG4gICAgICBmaWVsZC50eXBlID0gJ2Zvcm1seS10ZW1wbGF0ZSc7XG4gICAgfVxuXG4gICAgaWYgKCFmaWVsZC50eXBlICYmIGZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICAgIGZpZWxkLnR5cGUgPSAnZm9ybWx5LWdyb3VwJztcbiAgICB9XG5cbiAgICBpZiAoZmllbGQudHlwZSkge1xuICAgICAgdGhpcy5jb25maWcuZ2V0TWVyZ2VkRmllbGQoZmllbGQpO1xuICAgIH1cblxuICAgIGlmICghZmllbGRbJ2F1dG9DbGVhciddICYmICFpc1VuZGVmaW5lZChmaWVsZC5kZWZhdWx0VmFsdWUpICYmIGlzVW5kZWZpbmVkKGdldEZpZWxkVmFsdWUoZmllbGQpKSkge1xuICAgICAgYXNzaWduRmllbGRWYWx1ZShmaWVsZCwgZmllbGQuZGVmYXVsdFZhbHVlKTtcbiAgICB9XG5cbiAgICBmaWVsZC53cmFwcGVycyA9IGZpZWxkLndyYXBwZXJzIHx8IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWVsZENvbXBvbmVudEluc3RhbmNlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5jb25maWcucmVzb2x2ZUZpZWxkVHlwZVJlZihmaWVsZCk7XG4gICAgY29uc3QgaW5zdGFuY2U6IEZvcm1seUV4dGVuc2lvbiA9IGNvbXBvbmVudFJlZiA/IChjb21wb25lbnRSZWYuaW5zdGFuY2UgYXMgYW55KSA6IHt9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByZVBvcHVsYXRlOiAoKSA9PiBpbnN0YW5jZS5wcmVQb3B1bGF0ZSAmJiBpbnN0YW5jZS5wcmVQb3B1bGF0ZShmaWVsZCksXG4gICAgICBvblBvcHVsYXRlOiAoKSA9PiBpbnN0YW5jZS5vblBvcHVsYXRlICYmIGluc3RhbmNlLm9uUG9wdWxhdGUoZmllbGQpLFxuICAgICAgcG9zdFBvcHVsYXRlOiAoKSA9PiBpbnN0YW5jZS5wb3N0UG9wdWxhdGUgJiYgaW5zdGFuY2UucG9zdFBvcHVsYXRlKGZpZWxkKSxcbiAgICB9O1xuICB9XG59XG4iXX0=
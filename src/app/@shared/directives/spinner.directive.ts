import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { SpinnerComponent } from '@shared/components/ui/spinner/spinner.component';

/**
 * Diretiva para exibir um spinner de carregamento
 *
 * Baseada em:
 * https://github.com/akveo/nebular/blob/master/src/framework/theme/components/spinner/spinner.directive.ts
 */
@Directive({
  selector: '[appSpinner]',
})
export class SpinnerDirective implements OnInit {
  private shouldShow = false;
  loader: ComponentRef<SpinnerComponent>;
  componentFactory: ComponentFactory<SpinnerComponent>;

  /**
   * Spinner message shown next to the icon
   * @type {string}
   */
  @Input('spinnerMessage') spinnerMessage: string;

  /**
   * Spinner status color
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`.
   */
  @Input('spinnerStatus') spinnerStatus = 'basic';

  /**
   * Spinner size. Possible values: `tiny`, `small`, `medium` (default), `large`, `giant`
   */
  @Input('spinnerSize') spinnerSize: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Directive value - show or hide spinner
   * @param {boolean} val
   */
  @Input('appSpinner')
  set appSpinner(val: boolean) {
    if (this.componentFactory) {
      if (val) {
        this.show();
      } else {
        this.hide();
      }
    } else {
      this.shouldShow = val;
    }
  }

  @HostBinding('class.relative') loaderExists = false;

  constructor(
    private directiveView: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private directiveElement: ElementRef,
  ) {}

  ngOnInit() {
    this.componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
    if (this.shouldShow) {
      this.show();
    }
  }

  hide() {
    if (this.loaderExists) {
      this.directiveView.remove();
      this.loaderExists = false;
    }
  }

  show() {
    if (!this.loaderExists) {
      this.loader = this.directiveView.createComponent<SpinnerComponent>(
        this.componentFactory,
      );
      this.setInstanceInputs(this.loader.instance);
      this.loader.changeDetectorRef.detectChanges();
      this.renderer.appendChild(
        this.directiveElement.nativeElement,
        this.loader.location.nativeElement,
      );
      this.loaderExists = true;
    }
  }

  setInstanceInputs(instance: SpinnerComponent) {
    instance.message = this.spinnerMessage;
    typeof this.spinnerStatus !== 'undefined' && (instance.status = this.spinnerStatus);
    typeof this.spinnerSize !== 'undefined' && (instance.size = this.spinnerSize);
  }
}

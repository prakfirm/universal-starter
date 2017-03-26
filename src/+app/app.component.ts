import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    ElementRef,
    Inject,
    Renderer,
    ViewEncapsulation
} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";
import {isBrowser} from "angular2-universal";
import {NavigationEnd, Router} from "@angular/router";
import {Meta} from "../shared/meta/angular2-meta";
//
/////////////////////////
// ** Example Directive
// Notice we don't touch the Element directly

@Directive({
    selector: '[xLarge]'
})
export class XLargeDirective {
    constructor(element: ElementRef, renderer: Renderer) {
        // ** IMPORTANT **
        // we must interact with the dom through -Renderer-
        // for webworker/server to see the changes
        renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
        // ^^
    }
}

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'app',
    styles: [`
        * {
            padding: 0;
            margin: 0;
            font-family: 'Droid Sans', sans-serif;
        }

        #universal {
            text-align: center;
            font-weight: bold;
            padding: 15px 0;
        }

        nav {
            background: #158126;
            min-height: 40px;
            border-bottom: 5px #046923 solid;
        }

        nav a {
            font-weight: bold;
            text-decoration: none;
            color: #fff;
            padding: 20px;
            display: inline-block;
        }

        nav a:hover {
            background: #00AF36;
        }

        .hero-universal {
            min-height: 500px;
            display: block;
            padding: 20px;
            background: url('/assets/logo.png') no-repeat center center;
        }

        .inner-hero {
            background: rgba(255, 255, 255, 0.75);
            border: 5px #ccc solid;
            padding: 25px;
        }

        .router-link-active {
            background-color: #00AF36;
        }

        main {
            padding: 20px 0;
        }

        pre {
            font-size: 12px;
        }
    `],
    template: `
        <h3 id="universal">Angular2 Universal</h3>
        <nav>
            <a routerLinkActive="router-link-active" routerLink="home">Home</a>
            <a routerLinkActive="router-link-active" routerLink="about">About</a>
            <a routerLinkActive="router-link-active" routerLink="todo">Todo</a>
            <a routerLinkActive="router-link-active" routerLink="lazy">Lazy</a>
        </nav>
        <div class="hero-universal">
            <div class="inner-hero">
                <div>
                    <span xLarge>Universal JavaScript {{ title }}!</span>
                </div>

                Two-way binding: <input type="text" [value]="title" (input)="title = $event.target.value">

                <br>
                <br>

                <strong>Router-outlet:</strong>
                <main>
                    <router-outlet></router-outlet>
                </main>
            </div>
        </div>
    `
})
export class AppComponent {
    title = 'ftw';

    public constructor(public router: Router,
                       public meta: Meta,
                       @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const title: string = this.getRouterData('title', this.router.routerState, this.router.routerState.root).pop();
                const description: string = this.getRouterData('description', this.router.routerState, this.router.routerState.root).pop();
                const keywords: string = this.getRouterData('keywords', this.router.routerState, this.router.routerState.root).pop();
                const canonicalHref: string = this.getRouterData('canonicalHref', this.router.routerState, this.router.routerState.root).pop();
                // translate title
                this.meta.setTitle(title);
                this.meta.updateMeta('description', description);
                this.meta.updateMeta('keywords', keywords);


                // scroll top on every page transition
                if (isBrowser) {
                    this.document.body.scrollTop = 0;
                }
            }
        });
    }

    // todo refactor this, can be performance leak here
    public getRouterData(prop, state, parent): string[] {
        let data = [];
        if (parent && parent.snapshot.data && parent.snapshot.data[prop]) {
            const visaId = (parent.snapshot.params && parent.snapshot.params.visaId) || '';
            data.push(visaId + parent.snapshot.data[prop]);
        }

        if (state && parent) {
            data.push(... this.getRouterData(prop, state, state.firstChild(parent)));
        }
        return data;
    }
}

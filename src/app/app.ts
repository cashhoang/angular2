///<reference path="../../node_modules/typescript/lib/lib.es6.d.ts"/>

import { Component, provide, enableProdMode } from '@angular/core';
import { RouterConfig, ROUTER_DIRECTIVES, provideRouter } from '@angular/router';
import {HashLocationStrategy, LocationStrategy, Location} from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import { ArticleComponent } from './article/article.component';
import { Article } from './article/article.model';
import { bootstrap } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  directives: [ArticleComponent],
  template: `
    <form class="ui large form segment">
      <h3 class="ui header">Add a Link</h3>

      <div class="field">
        <label for="title">Title:</label>
        <input name="title" #newtitle>
      </div>
      <div class="field">
        <label for="link">Link:</label>
        <input name="link" #newlink>
      </div>

      <button (click)="addArticle(newtitle, newlink)"
              class="ui positive right floated button">
        Submit link
      </button>
    </form>

    <div class="ui grid posts">
      <reddit-article
        *ngFor="#article of sortedArticles()"
        [article]="article">
      </reddit-article>
    </div>
  `
})
export class App {
  articles: Article[];

  constructor() {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value, 0));
    title.value = '';
    link.value = '';
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

}

enableProdMode();
document.addEventListener("DOMContentLoaded", function(event) {
    bootstrap(App, [disableDeprecatedForms(), provideForms(), HTTP_PROVIDERS, 
				provide(LocationStrategy, {useClass: HashLocationStrategy})])
      .catch(err => console.error(err));
});
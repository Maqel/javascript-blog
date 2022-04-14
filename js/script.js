'use strict';
{
  /* OPTIONS */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  /*TITLE CLICK HANDLER*/
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    //console.log('Link was clicked!');

    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /*[DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /*[DONE] get 'href' attribute from the clicked link */
    const optArticleSelector = clickedElement.getAttribute('href');
    //console.log(optArticleSelector);//

    /*[DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(optArticleSelector);
    //console.log(targetArticle);//

    /*[DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };
  /* GENERATE TITLE LIST */
  const generateTitleLinks = function (){
  /* [DONE]remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* [DONE]for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for(let article of articles){

      /* [DONE]get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE]find the title element */
      const articleTitleElement = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE]get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitleElement + '</span></a></li>';
      //console.log(linkHTML);

      /* [DONE]create HTML of the link */
      titleList.innerHTML = titleList.innerHTML + linkHTML;

      /* [DONE]insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    //console.log(html);//

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();

  /* GENERATE TAGS LIST */
  const generateTags = function (){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagswrapper = article.querySelector(optArticleTagsSelector);
      tagswrapper.innerHTML = '';
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        /* add generated code to html variable */
        html = html + ' ' + tagHTML;
      } /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */

    } /* END LOOP: for every article: */
  };
  generateTags();

  /*TAGS CLICK HANDLER*/
  const tagClickHandler = function (event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
    }/* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href^="#tag-' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
    } /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  /* CLICK LISTENER TO TAGS */
  const addClickListenersToTags = function (){
    /* find all links to tags */

    /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

    /* END LOOP: for each link */
  };

  addClickListenersToTags();

}

'use strict';
{
  /*OPTIONS*/
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optAuthorsListSelector = '.authors.list',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  /*TITLE CLICK HANDLER*/
  const titleClickHandler = function(event){
    /*[DONE]prevent default action for this event*/
    event.preventDefault();
    const clickedElement = this;
    /*[DONE]remove class 'active' from all article links*/
    const activeLinks = document.querySelectorAll('.titles a.active');
    /*[DONE]START LOOP: for every links:*/
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    } /*[DONE]END LOOP*/
    /*[DONE]add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /*[DONE]remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    /*[DONE]START LOOP: for every Article:*/
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    } /*[DONE]END LOOP*/
    /*[DONE]get 'href' attribute from the clicked link*/
    const optArticleSelector = clickedElement.getAttribute('href');
    /*[DONE]find the correct article using the selector (value of 'href' attribute)*/
    const targetArticle = document.querySelector(optArticleSelector);
    /*[DONE]add class 'active' to the correct article*/
    targetArticle.classList.add('active');
  };

  /*GENERATE TITLE LIST*/
  const generateTitleLinks = function (customSelector = ''){
    /*[DONE]remove contents of titleList*/
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /*[DONE]for each article*/
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for(let article of articles){
      /*[DONE]get the article id*/
      const articleId = article.getAttribute('id');
      /*[DONE]find the title element*/
      const articleTitleElement = article.querySelector(optTitleSelector).innerHTML;
      /*[DONE]get the title from the title element*/
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitleElement + '</span></a></li>';
      /*[DONE]create HTML of the link*/
      titleList.innerHTML = titleList.innerHTML + linkHTML;
      /*[DONE]insert link into titleList*/
      html = html + linkHTML;
    } /*[DONE]END LOOP*/
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    /*[DONE]START LOOP*/
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    } /*[DONE]START LOOP*/
  };
  generateTitleLinks();

  /* GENERATE TAGS LIST */
  const calculateTagsParams = function (tags) {
    const params = {max: 0, min: 99999};
    for(let tag in tags){
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.max);
    }
    return params;
  };
  const calculateTagClass = function(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  };
  const generateTags = function (){
    /*[NEW]create a new variable allTags with an empty object*/
    let allTags = {};
    /*[DONE]find all articles*/
    const articles = document.querySelectorAll(optArticleSelector);
    /*[DONE]START LOOP: for every article:*/
    for(let article of articles){
      /*[DONE]find tags wrapper*/
      const tagList = article.querySelector(optArticleTagsSelector);
      /*[DONE]make html variable with empty string*/
      let html = '';
      /*[DONE]get tags from data-tags attribute*/
      const articleTags = article.getAttribute('data-tags');
      /*[DONE]split tags into array*/
      const articleTagsArray = articleTags.split(' ');
      /*[DONE]START LOOP: for each tag*/
      for(let tag of articleTagsArray){
        /*[DONE]generate HTML of the link*/
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        /*[DONE]add generated code to html variable*/
        html = html + ' ' + linkHTML;
        /*[NEW]check if this link is NOT already in allTags*/
        if(!allTags[tag]){
          /*[NEW]add tag to allTags object*/
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      } /*[DONE]END LOOP: for each tag*/
      /*[DONE]insert HTML of all the links into the tags wrapper*/
      tagList.innerHTML = html;
    } /*[DONE]END LOOP: for every article:*/
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParams:', tagsParams);
    /*[NEW] create variable for all links HTML code*/
    let allTagsHTML = '';
    /*[NEW] START LOOP: for each tag in allTags:*/
    for(let tag in allTags){
      /*[NEW] generate code of a link and add it to allTagsHTML*/
      const tagLinkHTML = '<li><a href=#tag-' + tag + ' class="' +  calculateTagClass(allTags[tag], tagsParams) + '"<span>' +  tag  + '</span></a></li>';
      allTagsHTML += tagLinkHTML;
      //console.log('tagLinkHTML:', tagLinkHTML);
    } /*[NEW] END LOOP: for each tag in allTags:*/
    /*[NEW] add HTML from allTagsHTML to tagList*/
    tagList.innerHTML = allTagsHTML;
  };
  generateTags();

  /*TAGS CLICK HANDLER*/
  const tagClickHandler = function(event){
    /*[DONE]prevent default action for this event*/
    event.preventDefault();
    /*[DONE]make new constant named "clickedElement" and give it the value of "this"*/
    const clickedElement = this;
    /*[DONE]make a new constant "href" and read the attribute "href" of the clicked element*/
    const href = clickedElement.getAttribute('href');
    /*[DONE]make a new constant "tag" and extract tag from the "href" constant*/
    const tag = href.replace('#tag-', '');
    /*[DONE]find all tag links with class active*/
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /*[DONE]START LOOP: for each active tag link*/
    for (let activeTag of activeTags) {
      /*[DONE]remove class active*/
      activeTag.classList.remove('active');
    } /*[DONE]END LOOP: for each active tag link*/
    /*[DONE]find all tag links with "href" attribute equal to the "href" constant*/
    const tagLinks = document.querySelectorAll('a[href^="#tag-' + href + '"]');
    /*[DONE]START LOOP: for each found tag link*/
    for (let tagLink of tagLinks) {
      /*[DONE]add class active*/
      tagLink.classList.add('active');
    } /*[DONE]END LOOP: for each found tag link*/
    /*[DONE]execute function "generateTitleLinks" with article selector as argument*/
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  /*CLICK LISTENER TO TAGS*/
  const addClickListenersToTags = function (){
    /*[DONE]find all links to tags*/
    const tagLinks = document.querySelectorAll('.tags a, .post-tags a');
    /*[DONE]START LOOP: for each link*/
    for (let tagLink of tagLinks) {
      /*[DONE]add tagClickHandler as event listener for that link*/
      tagLink.addEventListener('click', tagClickHandler);
    }/*[DONE]END LOOP: for each link*/
  };
  addClickListenersToTags();

  /*GENERATE AUTHOR*/
  const generateAuthor = function (){
    /* [NEW] create a new variable allTags with an empty array */
    let allAuthors = [];
    /*[DONE]find all articles*/
    const articles = document.querySelectorAll(optArticleSelector);
    /*[DONE]START LOOP for every article*/
    for (let article of articles){
      /*[DONE]make html variable with empty string*/
      let html = '';
      /*[DONE]get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      /*[DONE]generate HTML of the link*/
      const authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + ' ' + '</a>';
      /*add link to list*/
      const authorListHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + ' ' + '</a></li>';
      /*[DONE]add generated code to html variable*/
      html = html + ' ' + authorHTML;
      /*[NEW] check if this link is NOT already in all Aurhors*/
      if(allAuthors.indexOf(authorListHTML) == -1){
        /*[NEW] add generated code to all Authors array*/
        allAuthors.push(authorListHTML);
      }
      /*[DONE]insert HTML of all the links into the autor wrapper*/
      const authorName = article.querySelector(optArticleAuthorSelector);
      authorName.innerHTML = html;
    } /*[DONE]END LOOP for every article*/
    /*[NEW] find list of authors in right column*/
    const authorsList = document.querySelector(optAuthorsListSelector);
    /*[NEW] add html from allAuthors to authorsList*/
    authorsList.innerHTML = allAuthors.join(' ');
  };
  generateAuthor();

  /*AUTHOR CLICK HANDLER*/
  const authorClickHandler = function(event){
    /*[DONE]prevent default action for this event*/
    event.preventDefault();
    /*[DONE]make new constant named "clickedElement" and give it the value of "this"*/
    const clickedElement = this;
    /*[DONE]make a new constant "href" and read the attribute "href" of the clicked element*/
    const href = clickedElement.getAttribute('href');
    /*[DONE]make a new constant "author" and extract author from the "href" constant*/
    const author = href.replace('#author-', '');
    /*[DONE]find all author links with class active*/
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    /*[DONE]START LOOP: for each active author link*/
    for (let activeAuthor of activeAuthors) {
      /*[DONE]remove class active */
      activeAuthor.classList.remove('active');
    }/*[DONE]END LOOP: for each active author link*/
    /*[DONE]find all author links with "href" attribute equal to the "href" constant*/
    const authorLinks = document.querySelectorAll('a[href^="#author-' + href + '"]');
    /*[DONE]START LOOP: for each found author link*/
    for (let authorLink of authorLinks) {
      /*[DONE]add class active*/
      authorLink.classList.add('active');
    } /*[DONE]END LOOP: for each found author link*/
    generateTitleLinks('[data-author="' + author + '"]');
    /*[DONE]execute function "generateTitleLinks" with article selector as argument*/
  };

  /*AUTHOR CLICK LISTENER*/
  const addClickListenersToAuthors = function(){
    /*[DONE] find all links to authors*/
    const authorLinks = document.querySelectorAll('.post-author a, .authors.list a');
    /*[DONE] START LOOP: for each link*/
    for (let authorLink of authorLinks){
      /*[DONE] add authorClickHandler as event listener for that link*/
      authorLink.addEventListener('click', authorClickHandler);
    } /*[DONE] END LOOP: for each link */
  };
  addClickListenersToAuthors();
}

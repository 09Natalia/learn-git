//попробую сделать тесты на bbc.com

describe('Bbc navigation', () => {
  beforeEach(() => {
    cy.visit('https://www.bbc.com/');
    cy.wait(2000);
  });


  it('Открытие главной страницы и проверка заголовка', () => {

    // Проверка заголовка главной страницы
    cy.title().should('eq', 'BBC Home - Breaking News, World News, US News, Sports, Business, Innovation, Climate, Culture, Travel, Video & Audio')

  })

  it('Есть кнопки логин и регистрация', () => {
    cy.get('.sc-8342e32-8.jLoJFd') // проверяем наличие кнопки и текста на ней
      .should('exist')
      .contains('Register')
  

    //cy.get('.sc-8342e32-8.jLoJFd') // проверяем ссылку в кнопке
   // .closest('a') // ищем ссылку, обернутую вокруг кнопки
    //.and('have.attr', 'href')
   // .and('include', '/register')
  
    cy.get('.sc-28fdc07f-2.sc-28fdc07f-5.jumpKn.dSGHyC').should('exist')
      .should('exist')
      .contains('Sign In')

    //тесты те же, только другой вариант
    cy.get('button[aria-label="Register"]', { timeout: 10000 }).should('be.visible') // ок
    cy.get('button[aria-label="Sign In"]', { timeout: 10000 }).should('be.visible') // ок
    cy.wait(2000);
  })

  it('Проверка наличия логотипа', () => {
    cy.get('svg[category="logo"][icon="bbc"]')
      .should('have.length', 2)
      .and('be.visible')

    cy.wait(2000);  
  })

  it('Проверка иконок соц.сетей', () => {
   cy.get('button[aria-label="Follow BBC on x"]').should('exist')
   cy.get('button[aria-label="Follow BBC on facebook"]').should('exist')
   cy.get('button[aria-label="Follow BBC on instagram"]').should('exist')
   cy.get('button[aria-label="Follow BBC on tiktok"]').should('exist')
   cy.get('button[aria-label="Follow BBC on linkedin"]').should('exist')
   cy.get('button[aria-label="Follow BBC on youtube"]').should('exist')
   cy.wait(2000);
  
  })

  it('Есть кликабельная "ссылка more news"', () => {
    cy.get('[data-testid="virginia-title"]')
      .should('exist')
      .contains('More news')
      .and('be.visible')
    
    cy.get('[data-testid="virginia-title"]')  
      .parent('a')                            // поднимаемся к родителю <a>
      .should('have.attr', 'href')  
      .and('include', '/news')

    cy.wait(2000);
  })

    it('Переход на News', () => {
    
    //cy.contains('News').click() // не открывает

    cy.get('footer').contains('News').should('be.visible') // новости есть в фетере
    cy.get('footer').contains('News').click() // клик

    cy.url().should('include', '/news')
    cy.title().should('eq', 'BBC News - Breaking news, video and the latest top stories from the U.S. and around the world')
    cy.wait(2000);
  })


  it('Поиск через search по слову Canada', () => {
    
    cy.get('button[aria-label="Open menu"]').click({ force: true })  // кликаем по поиску
    cy.get('input[placeholder="Search news, topics and more"]').type('Canada{enter}') // ввод в строку поиска Canada
    cy.url().should('include', '/search') // поиск выполнен, в урл есть /search
    cy.contains('Canada', { matchCase: false }).should('exist')
    cy.wait(2000);
  } )


})




describe('Bbc navigation', () => {
  beforeEach(() => {
    cy.visit('https://www.bbc.com/');
    cy.wait(1000);
  });


  it('Открытие главной страницы и проверка заголовка', () => {
    cy.title({ timeout: 10000 }).should('include', 'BBC Home')
  })

  it('Есть кнопки логин и регистрация', () => {
    cy.get('button[aria-label="Register"]', { timeout: 10000 }).should('be.visible')
    cy.get('button[aria-label="Sign In"]', { timeout: 10000 }).should('be.visible')
    cy.wait(1000);
  })

  it('Проверка наличия логотипа', () => {
    cy.get('svg[category="logo"][icon="bbc"]')
      .should('have.length', 2)
      .and('be.visible')

    cy.wait(1000);  
  })

  it('Проверка иконок соц.сетей', () => {
   cy.get('button[aria-label="Follow BBC on x"]').should('exist')
   cy.get('button[aria-label="Follow BBC on facebook"]').should('exist')
   cy.get('button[aria-label="Follow BBC on instagram"]').should('exist')
   cy.get('button[aria-label="Follow BBC on tiktok"]').should('exist')
   cy.get('button[aria-label="Follow BBC on linkedin"]').should('exist')
   cy.get('button[aria-label="Follow BBC on youtube"]').should('exist')
   cy.wait(500);
  
  })

  it('Есть кликабельная "ссылка more news"', () => {
    cy.get('[data-testid="virginia-title"]')
      .should('exist')
      .contains('More news')
      .and('be.visible')
    
    cy.get('[data-testid="virginia-title"]')  
      .parent('a')
      .should('have.attr', 'href')  
      .and('include', '/news')

    cy.wait(1000);
  })

  it('Переход на News', () => {
    cy.get('footer').contains('News').should('be.visible')
    cy.get('footer').contains('News').click()

    cy.url({ timeout: 10000 }).should('include', '/news')
    cy.title({ timeout: 10000 }).should('include', 'BBC News')
    cy.wait(1000);
  })

  it('Клик "назад" с вкладки News', () => {
    cy.visit('https://www.bbc.com/');
    cy.get('footer').contains('News').should('be.visible')
    cy.get('footer').contains('News').click()

    cy.go('back')
    cy.url({ timeout: 10000 }).should('not.include', '/news')
    cy.title().should('include', 'BBC Home')
    cy.wait(1000);
  })

    it('Переход вкладку Asia с вкладки News', () => {
    cy.viewport(1280, 800);
    cy.visit('https://www.bbc.com/news');
    cy.get('nav').should('contain.text', 'Asia');
    cy.contains('[data-testid="subNavigationLink"]', 'Asia').click();
    cy.url().then(u => cy.log('URL now:', u));
    cy.url({ timeout: 10000 }).should('include','/news/world/asia');
    
    cy.wait(1000);
  })

  it('Скролл до Features на странице Asia и клик по первой статье', () => {
    cy.viewport(1280, 800);
    cy.visit('https://www.bbc.com/news/world/asia');
    cy.contains('[data-testid="section-title-wrapper"]','Features')
      .scrollIntoView()
      .should('be.visible');
    cy.get('[data-testid="nevada-section-5"]')
      .find('[data-testid="nevada-grid-5"]')
       .eq(1)
      .scrollIntoView()
      .within(() => {
          cy.get('[data-testid="anchor-inner-wrapper"]').first().click();
        });
    cy.wait(1000);    
  
  })

})

describe('Bbc search', () => {
  beforeEach(() => {
    cy.visit('https://www.bbc.com/');
    cy.wait(500);
  });

  it('Поиск через search по слову Canada', () => {
    
    cy.get('button[aria-label="Open menu"]').click({ force: true })
    cy.get('input[placeholder="Search news, topics and more"]').type('Canada{enter}')
    cy.url().should('include', '/search')
    cy.contains('Canada', { matchCase: false }).should('exist')
    cy.wait(1000);
  } )

  it('Есть результаты после обновления страницы', () => {
    
    cy.get('button[aria-label="Open menu"]').click({ force: true }) 
    cy.get('input[placeholder="Search news, topics and more"]').type('Canada{enter}') 
    cy.url({ timeout: 10000 }).should('include', '/search')
    cy.contains('Canada', { matchCase: false }).should('exist')

    cy.reload();

    cy.url({ timeout: 10000 }).should('include', '/search');
    cy.contains('Canada', { matchCase: false }).should('exist');
    cy.get('[data-testid="new-jersey-grid"]').should('exist').and('not.be.empty');
    cy.wait(1000);
  } )

  it('Тест на поиск по слову с пробелами и на чувствительность к регистру', () => {
    cy.get('button[aria-label="Open menu"]').click({ force: true });
    cy.get('input[placeholder="Search news, topics and more"]')
      .type(' caNAda {enter}');
    
    cy.url({ timeout: 10000 }).should('include', '/search') 
    cy.contains('Canada', { matchCase: false }).should('exist');
    cy.get('[data-testid="new-jersey-grid"]')
      .should('exist')
      .and('not.be.empty');
  });
})  




    


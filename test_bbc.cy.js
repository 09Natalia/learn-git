//попробую сделать тесты на bbc.com

describe('Bbc navigation', () => {


    it('Открытие главной страницы', () => {
    cy.visit('https://www.bbc.com/')

    // Проверка заголовка главной страницы
    cy.title().should('eq', 'BBC Home - Breaking News, World News, US News, Sports, Business, Innovation, Climate, Culture, Travel, Video & Audio')


    // Проверка наличия кнопок 'Sign in' 'Register'
   // cy.contains('button',{ timeout: 10000 } , 'Sign In') //не ищет
    //cy.contains('button', { timeout: 10000 }, 'Register') // не ищет
    cy.get('button[aria-label="Register"]', { timeout: 10000 }).should('be.visible') // ок
    cy.get('button[aria-label="Sign In"]', { timeout: 10000 }).should('be.visible') // ок
  })

//   it('Есть логотип BBC', () => { // не получилось найти лого
//       cy.get('svg[category="logo"][icon="bbc"]', { timeout: 10000 })
//       .should('have.class', 'sc-583246d7-0')
//       .should('have.class', 'sc-583246d7-0')
//       .and('be.visible')
    
//   })

    


    it('Переход на News', () => {
    cy.visit('https://www.bbc.com/')
    //cy.contains('News').click() // не открывает

    cy.get('footer').contains('News').should('be.visible') // новости есть в фетере
    cy.get('footer').contains('News').click() // клик

    cy.url().should('include', '/news')
    cy.title().should('eq', 'BBC News - Breaking news, video and the latest top stories from the U.S. and around the world')

  })




})




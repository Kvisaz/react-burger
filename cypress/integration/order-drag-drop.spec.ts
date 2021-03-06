describe('drag and drop burger parts', function() {
  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });

  it('should basket order visible', () => {
    waitOrderBasket();
  });
  

  it('should drag first item to the order', () => {
    waitOrderBasket();
    dragDropByIndex(0);
  });

  it('should drag some items to the basket', () => {
    waitOrderBasket();
    dragDropByIndex(2);
    dragDropByIndex(4);
    dragDropByIndex(6);
    getOrderButton().then($button => {
      if ($button.is(':visible')) {
        console.log('order button is visible');
      }
    });
  });

});

function getBurgerParts() {
  return cy.get('[data-cy=burger-part]');
}

function getOrderBasket() {
  return cy.get('[data-cy=burger-basket]');
}

function waitOrderBasket() {
  return cy.get('[data-cy=burger-basket]', {timeout: 10000}).should('be.visible');
}

function getOrderButton() {
  return cy.get('[data-cy=burger-basket-order-button]');
}

function getOrderedItems() {
  return cy.get('[data-cy=burger-basket-order-item]');
}

function getDraggableOrderedItems() {
  return cy.get('[data-cy=burger-basket-order-item]').filter('[draggable]');
}

function dragDropByIndex(index: number) {
  const dataTransfer = new DataTransfer();

  getBurgerParts().eq(index).trigger('dragstart', {
    dataTransfer,
  });

  getOrderBasket().trigger('drop', {
    dataTransfer,
  });
}
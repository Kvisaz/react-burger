describe('drag and drop burger parts', function() {
  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });


  it('should drag first item to the order', () => {
    const dataTransfer = new DataTransfer();

    const burgerParts = cy.get('[data-cy=burger-part]');

    burgerParts.eq(0).trigger('dragstart', {
      dataTransfer
    });

    cy.get('[data-cy=burger-basket]').trigger('drop', {
      dataTransfer
    });
  });

  it('should drag some items to the basket', () => {
    const dataTransfer = new DataTransfer();

    const burgerParts = cy.get('[data-cy=burger-part]');

    burgerParts.eq(2).trigger('dragstart', {
      dataTransfer
    });

    cy.get('[data-cy=burger-basket]').trigger('drop', {
      dataTransfer
    });
  });
});

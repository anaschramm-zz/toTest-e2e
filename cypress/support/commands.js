Cypress.Commands.add("preencherCamposObrigatorios", () => {
    cy.get("#elementosForm\\:nome").type("Ana Clara");
    cy.get("#elementosForm\\:sobrenome").type("Schramm");
    cy.contains("Feminino").click();
 });



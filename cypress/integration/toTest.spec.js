require("cypress-xpath");

describe("Cenários de test para a página toTest", () => {
  beforeEach(() => {
    cy.visit("./toTest.html");
  });

  it("Preencher todos os campos", () => {
    cy.get("#elementosForm\\:nome").type("Ana Clara");
    cy.get("#elementosForm\\:sobrenome").type("Schramm");
    cy.contains("Feminino").click();
    cy.get("input[value='pizza']").click();
    cy.get("#elementosForm\\:escolaridade").select("superior");
    cy.get("#elementosForm\\:esportes").select("futebol");
    cy.get("#elementosForm\\:sugestoes").type("Não tenho sugestões");
    cy.xpath("//td[text()='Francisco']/following-sibling::td/child::input[@type='checkbox']").click();
    cy.xpath("//td[text()='Maria']/following-sibling::td//child::input[@type='radio']").click();
    cy.xpath("//td[text()='Maria']/following-sibling::td/child::input[@type='text']").type("Maria");


    cy.get("input[name='elementosForm\\:cadastrar']").click();

    cy.contains("Cadastrado!").should("be.visible");
    cy.get("#descNome > span").should(($element) => {
      expect($element).to.have.text("Ana Clara");
    });
    cy.get("#descSobrenome > span").should(($element) => {
      expect($element).to.have.text("Schramm");
    });
    cy.get("#descSexo > span").should(($element) => {
      expect($element).to.have.text("Feminino");
    });
    cy.get("#descComida > span").should(($element) => {
      expect($element).to.contains.text("Pizza");
    });
    cy.get("#descEscolaridade > span").should(($element) => {
      expect($element).to.have.text("superior");
    });
    cy.get("#descEsportes > span").should(($element) => {
      expect($element).to.contains.text("Futebol");
    });
    cy.get("#descSugestoes > span").should(($element) => {
      expect($element).to.have.text("Não tenho sugestões");
    });

  });

  it("Validar campo obrigatório 'Nome'", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("#elementosForm\\:cadastrar").click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith("Nome eh obrigatorio");
    });
  });

  it("Validar campo obrigatório 'Sobrenome'", () => {
    cy.get("#elementosForm\\:nome").type("Ana Clara");

    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("#elementosForm\\:cadastrar").click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith("Sobrenome eh obrigatorio");
    });
  });

  it("Validar campo obrigatório 'Sexo'", () => {
    cy.get("#elementosForm\\:nome").type("Ana Clara");
    cy.get("#elementosForm\\:sobrenome").type("Schramm");

    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("#elementosForm\\:cadastrar").click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith("Sexo eh obrigatorio");
    });
  });

  it("Validar exibição de alerta para pessoas vegetarianas", () => {
    cy.preencherCamposObrigatorios();

    cy.get("input[value='vegetariano']").click();
    cy.get("input[value='carne']").click();

    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("#elementosForm\\:cadastrar").click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith("Tem certeza que voce eh vegetariano?");
    });
  });

  it("Validar informação retornada no alerta da tabela escolaridade", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.xpath("//td[text()='Maria']/following-sibling::td/child::input[@type='button']").click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith("Maria");
    });
  });

  it("Validar mensagem exibida ao clicar no botão 'Clique Me!'", () => {
    cy.get("#buttonSimple").click();
    cy.get("input[value='Obrigado!']").should("be.visible");
  });

  it.only("Validar exibição de Popup ao clicar no botão 'Abrir Popup'", () => {
    cy.get("#buttonPopUpEasy").click();
  });

});

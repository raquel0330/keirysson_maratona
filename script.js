// ========================================
// DADOS DA PESQUISA
// ========================================

const totalRespostas = 22;

const cores = {
    verdeEscuro: "#145438",
    verde: "#218653",
    verdeClaro: "#75c995",
    verdeSuave: "#bde8ca",
    cinza: "#dce8df",
    texto: "#52665a"
};


// ========================================
// GRÁFICO 1 - PIZZA
// FREQUÊNCIA DE UTILIZAÇÃO DA IA
// ========================================

const usageChart = new Chart(
    document.getElementById("usageChart"),
    {
        type: "pie",

        data: {

            labels: [
                "Sim, constantemente",
                "Não, nunca usei",
                "Às vezes eu uso"
            ],

            datasets: [{

                data: [5, 0, 17],

                backgroundColor: [
                    cores.verdeEscuro,
                    cores.cinza,
                    cores.verdeClaro
                ],

                borderColor: "#ffffff",
                borderWidth: 4,
                hoverOffset: 12

            }]

        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            animation: {
                animateRotate: true,
                duration: 1200
            },

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: cores.texto,
                        padding: 18,
                        usePointStyle: true,
                        pointStyle: "circle",

                        font: {
                            family: "DM Sans",
                            size: 11
                        }

                    }

                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            const quantidade = context.raw;

                            const percentual =
                                (
                                    quantidade /
                                    totalRespostas *
                                    100
                                ).toLocaleString("pt-BR", {
                                    maximumFractionDigits: 1
                                });

                            return `${quantidade} estudantes - ${percentual}%`;

                        }

                    }

                }

            }

        }

    }

);


// ========================================
// GRÁFICO 2 - BARRAS
// COMPORTAMENTO APÓS PESQUISAR
// ========================================

// Dados originais da pesquisa

const dadosOriginais = {

    labels: [
        ["Apenas copio", "as respostas"],
        ["Analiso, mas não", "adquiro conhecimento"],
        ["Leio e obtenho", "conhecimentos"]
    ],

    valores: [1, 4, 17],

    cores: [
        cores.verdeSuave,
        cores.verdeClaro,
        cores.verde
    ]

};


const learningChart = new Chart(
    document.getElementById("learningChart"),
    {
        type: "bar",

        data: {

            labels: dadosOriginais.labels,

            datasets: [{

                label: "Quantidade de estudantes",

                data: dadosOriginais.valores,

                backgroundColor: dadosOriginais.cores,

                borderRadius: 9,
                borderSkipped: false,
                maxBarThickness: 55

            }]

        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            animation: {
                duration: 1200
            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            const quantidade = context.raw;

                            const percentual =
                                (
                                    quantidade /
                                    totalRespostas *
                                    100
                                ).toLocaleString("pt-BR", {
                                    maximumFractionDigits: 1
                                });

                            return `${quantidade} estudantes - ${percentual}%`;

                        }

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: cores.texto,

                        font: {
                            family: "DM Sans",
                            size: 10
                        }

                    },

                    grid: {
                        display: false
                    },

                    border: {
                        display: false
                    }

                },

                y: {

                    beginAtZero: true,
                    max: 20,

                    ticks: {

                        stepSize: 5,
                        precision: 0,
                        color: cores.texto

                    },

                    title: {

                        display: true,
                        text: "Número de estudantes",
                        color: cores.texto

                    },

                    grid: {
                        color: "#eaf1eb"
                    },

                    border: {
                        display: false
                    }

                }

            }

        }

    }

);


// ========================================
// FILTRO INTERATIVO GERAL
// ========================================

const chartFilter = document.getElementById("chartFilter");

const usageCard = document.getElementById("usageCard");

const learningCard = document.getElementById("learningCard");


chartFilter.addEventListener("change", function(event) {

    const opcaoSelecionada = event.target.value;


    // Exibir ou esconder o gráfico de pizza

    usageCard.classList.toggle(
        "hidden",
        opcaoSelecionada === "learning"
    );


    // Exibir ou esconder o gráfico de barras

    learningCard.classList.toggle(
        "hidden",
        opcaoSelecionada === "usage"
    );

});


// ========================================
// NOVO FILTRO DE DADOS
// GRÁFICO 2 - APRENDIZAGEM
// ========================================

const dataFilter = document.getElementById("dataFilter");


function atualizarFiltroDados() {

    const opcaoSelecionada = dataFilter.value;


    if (opcaoSelecionada === "all") {

        // =================================
        // MOSTRAR TODAS AS RESPOSTAS
        // =================================

        learningChart.data.labels = dadosOriginais.labels;

        learningChart.data.datasets[0].data =
            dadosOriginais.valores;

        learningChart.data.datasets[0].backgroundColor =
            dadosOriginais.cores;

    } else {

        // =================================
        // DESTACAR RESPOSTA PREDOMINANTE
        // =================================

        const indicePredominante =
            dadosOriginais.valores.indexOf(
                Math.max(...dadosOriginais.valores)
            );

        const quantidadePredominante =
            dadosOriginais.valores[indicePredominante];

        const quantidadeOutras =
            totalRespostas - quantidadePredominante;


        learningChart.data.labels = [

            [
                "Leem e obtêm",
                "conhecimentos"
            ],

            "Outras respostas"

        ];


        learningChart.data.datasets[0].data = [

            quantidadePredominante,
            quantidadeOutras

        ];


        learningChart.data.datasets[0].backgroundColor = [

            cores.verdeEscuro,
            cores.verdeSuave

        ];

    }


    // =================================
    // ATUALIZAR VISUALIZAÇÃO
    // =================================

    learningChart.update();

}


// ========================================
// EVENTO DO FILTRO DE DADOS
// ========================================

if (dataFilter) {

    dataFilter.addEventListener(
        "change",
        atualizarFiltroDados
    );

}


// ========================================
// FIM DO PROJETO
// ========================================
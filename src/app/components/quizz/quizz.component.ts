import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title: string = ""

  questions: any
  questionSelected: any

  answers: string[] = []  // sempre começar com um valor vazio
  answerSelected: string = ""

  questionIndex: number = 0  // pra pegar a posição do ponteiro
  questionMaxIndex: number = 0

  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {  // se ele encontrar e tiver na memoria, vai trazer a propriedade title
      this.finished = false
      this.title = quizz_questions.title  // pra pegar a propriedade title, vai pegar do json

      // salvar a coleção de perguntas no questions
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex] // esta pegando a posição do ponteiro

      // configurar ponteiro
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length  // pra pegar o quantidade de perguntas que tem dentro dele
    }
  }
  playerChoose(value: string) {
    this.answers.push(value)
    this.nextStep()
  }


  // pra fazer o ponteiro andar
  async nextStep() {
    this.questionIndex += 1
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      // as keyof typeof, usar quando ele não sabe o tipo da variavel, e com isso fala que é o mesmo tipo de quizz_questions.results
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]

      // verificar opção ganhadora
      console.log(this.answers)

    }
  }

  async checkResult(answers: string[]) {
    // reduce, pra reduzir pra um unico resultado
    // current = é o valor atual que esta percorrendo
    // i = é o index
    // arr = é o vetor
    // ['A', 'A', 'B', 'A'], fazer a função pra saber se tem mais A ou B
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous // se o elemento anterior tiver mais que o elemento current retorna previous
      } else {
        return current
      }
    })
    return result
  }

}

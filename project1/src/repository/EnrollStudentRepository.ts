import EnrollStudent from '../domain/EnrollStudent';
import { v4 as uuidv4 } from 'uuid';
import { validateCpf, extractDigits } from '../utils/validateCpf';
import { validateName } from '../utils/valudateName';

export default class EnrollStudentRepository {
  enrollStudents: EnrollStudent[];

  constructor() {
    this.enrollStudents = [];
  }

  public all(): EnrollStudent[] {
    return this.enrollStudents;
  }

  public findByCpf(cpf: string): EnrollStudent | null {
    const student = this.enrollStudents.find(student => student.cpf === cpf);
    return student || null;
  }

  public create({ name, cpf }: EnrollStudent): EnrollStudent {
    if (!validateName(name)) {
      throw new Error('Invalid student name');
    }

    if (!validateCpf(cpf)) {
      throw new Error('Invalid student cpf');
    }

    cpf = extractDigits(cpf);
    if (!!this.findByCpf(cpf)) {
      throw new Error('Enrollment with duplicated student is not allowed');
    } else {
      const student: EnrollStudent = { id: uuidv4(), name, cpf };
      this.enrollStudents.push(student);
      return student;
    }
  }
}
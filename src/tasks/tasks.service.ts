import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, ETaskStatus } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private repository: TasksRepository,
  ) {}

  async getTaskById(id: string, user: User): Promise<Task | undefined> {
    const found = await this.repository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} does not exist`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = this.repository.create({
      title,
      description,
      status: ETaskStatus.OPEN,
      user,
    });

    await this.repository.save(task);
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskById(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const task = await this.repository.findOne(id);
    task.status = status as ETaskStatus;
    this.repository.save(task);
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.repository.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }
    const tasks = await query.getMany();

    return tasks;
  }

  /* getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task | undefined {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} does not exist`);
    }
    return found;
  }

  deleteTaskById(id: string): void {
    this.getTaskById(id); //If task not found nest will throw error
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskById(id: string, updateTaskStatusDto: UpdateTaskStatusDto): void {
    const { status } = updateTaskStatusDto;
    const task = this.getTaskById(id);
    task.status = status as TaskStatus;
  } */
}

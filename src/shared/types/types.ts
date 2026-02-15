export type Todo = {
  id: number;
  name: string;
  notes: Note[];
};

export type Note = {
  idNote: number;
  text: string;
  done: boolean;
};

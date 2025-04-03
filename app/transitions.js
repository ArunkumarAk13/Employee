export default function () {
    this.transition(
      this.fromRoute('employee-list'),
      this.toRoute('add-employee'),
      this.use('toLeft'),
      this.reverse('toRight')
    );
  
    this.transition(
      this.fromRoute('employee-list'),
      this.toRoute('edit-employee'),
      this.use('fade'),
      this.reverse('fade')
    );
  }
  
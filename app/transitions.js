export default function(){
  this.transition(
    this.fromRoute('session.new'),
    this.toRoute('session.signup'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
  this.transition(
    this.fromRoute('teacher.index.index'),
    this.toRoute('teacher.index.curriculums'),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
  this.transition(
    this.toRoute(['teacher.index', 'teacher.add-student', 'teacher.add-fact', 'teacher.add-curriculum']),
    this.use('toDown')
  );
};

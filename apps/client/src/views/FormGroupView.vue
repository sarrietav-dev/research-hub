<template>
    <main>
      <div class="login">
        <h1>Login</h1>
        <div class="groups">
            <div class="new_group_old_group">
                <label for="new_group_old_group">Desea usar un grupo de investigación que ya existe:</label>
                <label><input type="radio" id="old_group" name="new_group_old_group">Si</label>
                <label><input type="radio" id="new_group" name="new_group_old_group">No</label>
            </div>
            <div class="new_group">
                <label for="new_group">Grupo de Investigación:</label>
                <input type="text" name="new_group">
            </div>
            <div class="new_seed_g_old_seed_g">
                <label for="new_seed_g_old_seed_g">Desea usar un semillero de investigación que ya existe:</label>
                <label><input type="radio" id="old_seed_g" name="new_seed_g_old_seed_g">Si</label>
                <label><input type="radio" id="new_seed_g" name="new_seed_g_old_seed_g">No</label>
            </div>
            <div class="new_seed_group">
                <label for="new_seed_group">Semillero de Investigación:</label>
                <input type="text" name="new_seed_group" >
            </div>
        </div>
        <div class="new_student_old_student">
                <label for="new_student_old_student">Desea usar un semillero de investigación que ya existe:</label>
                <label><input type="radio" id="old_seed_g" name="new_student_old_student">Si</label>
                <label><input type="radio" id="new_seed_g" name="new_student_old_student">No</label>
            </div>
        <div class="new_student_info">
            <div class="student_name">
                <label for="student_name">Nombre del estudiante:</label>
                <input type="text" name="student_name" >
            </div>
            <div class="student_program">
                <label for="student_program">Programa del estudiante:</label>
                <input type="text" name="student_program" >
            </div>
            <div class="student_email">
                <label for="student_email">Email del estudiante:</label>
                <input type="email" name="student_email" >
            </div>
        </div>
        <button>Send</button>
      </div>
    </main>
  </template>

<style>
.new_group_old_group .new_group .new_seed_g_old_seed_g .new_seed_g {
    display: none;
}

#new_group:checked + .new_group {
    display: block;
}

#new_seed_g:checked + .new_seed_g {
    display: block;
}
</style>
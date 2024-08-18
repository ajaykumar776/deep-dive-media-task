<?php

// database/migrations/YYYY_MM_DD_update_tasks_table_add_fields.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTasksTableAddFields extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('title'); // Fixing typo in 'sring'
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
            $table->date('due_date')->nullable();
            $table->integer('priority')->default(1);
            $table->unsignedBigInteger('user_id'); // Foreign key for user
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}


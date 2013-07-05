class TasksController < ApplicationController

	def index

		# If a state constraint has been given, use it
		if(params.has_key?(:state_id)) 
			@tasks=Task.where(state_id: params[:state_id])
		else
			@tasks=Task.all
		end

		respond_to do |format|
			
			format.html { render partial: 'index' }
			format.json { render json: @tasks }
		end
	end

	def update
		@task=Task.find(params[:id])
			
		respond_to do |format|
		
		  if @task.update(:state_id=>params[:state_id])

			format.json { head :no_content }
		  else
			format.json { render json: @task.errors, status: :unprocessable_entity }
		  end
		end
	end


	def overview
	
		# Shows the overview action
	end
	
	
	def show
	
		@tasks=Task.find(params[:id])
	
	end
	


end

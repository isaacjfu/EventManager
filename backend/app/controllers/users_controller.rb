class UsersController < ApplicationController
  include UserHelper
  # might want to add authentication? but for login it should be ok
  skip_before_action :verify_authenticity_token

  def authentication
    username = params[:username]
    password = params[:password]
    password = password[1,password.length-1]
    user = User.where("name = ? AND password = ?", params[:username], password)
    if user.empty?
      render json: {error: "Please try again"},status:400
    else
      render :json => user
    end
  end

  def createNewUser
    user = User.new(name: params[:username], password: params[:password], age: params[:age], credibility: 7)
    if user.save
      render :json => user
    else
      render json: {error: "Unable to create user"}, status:400
    end
  end

  def index
    users = User.all
    if users
      render :json => users
    else
      render json: {error: "Unable to find users"}, status:400
    end
  end

  def show
    user = User.find(params[:id])
    if user
      render :json => user
    else
      render json: {error: "Unable to find user"}, status:400
    end
  end

  def create
    user = User.new(name: params[:name], age: params[:age], credibility: params[:credibility])
    if user.save
      render :json => user
    else
      render json: {error: "Unable to create user"}, status:400
    end
  end

  def update
    user = User.find(params[:id])
    if user
      user.update(user_params)
      render :json => user
    else
      render json: {error: "Unable to update user"}, status:400
    end
  end

  def destroy
    user = User.find(params[:id])
    if user
        user.destroy
        render json: {message: "user successfully deleted"}, status: 200
    else
        render json: {error: "Unable to delete user"}, status: 400
    end
  end
end

package controllers

import play.api.mvc._
import play.api.libs.json._
import javax.inject._
import scala.collection.mutable.ListBuffer
import models.Category

@Singleton
class CategoryController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val categories = ListBuffer(
    Category(1, "Elektronika"),
    Category(2, "RTV"),
    Category(3, "AGD")
  )

  def getAll = Action {
    Ok(Json.toJson(categories))
  }

  def getById(id: Int) = Action {
    categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound(Json.obj("error" -> "Category not found"))
    }
  }

  def add = Action(parse.json) { request =>
    request.body.validate[Category] match {
      case JsSuccess(newCategory, _) =>
        categories += newCategory
        Created(Json.toJson(newCategory))
      case JsError(_) =>
        BadRequest(Json.obj("error" -> "Invalid JSON"))
    }
  }

  def update(id: Int) = Action(parse.json) { request =>
    request.body.validate[Category] match {
      case JsSuccess(updatedCategory, _) =>
        categories.indexWhere(_.id == id) match {
          case -1 => NotFound(Json.obj("error" -> "Category not found"))
          case index =>
            categories.update(index, updatedCategory)
            Ok(Json.toJson(updatedCategory))
        }
      case JsError(_) =>
        BadRequest(Json.obj("error" -> "Invalid JSON"))
    }
  }

  def delete(id: Int) = Action {
    categories.indexWhere(_.id == id) match {
      case -1 => NotFound(Json.obj("error" -> "Category not found"))
      case index =>
        categories.remove(index)
        NoContent
    }
  }
}

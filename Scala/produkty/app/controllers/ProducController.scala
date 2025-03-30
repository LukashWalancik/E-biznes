package controllers

import play.api.mvc._
import play.api.libs.json._
import javax.inject._
import scala.collection.mutable.ListBuffer
import models.Product

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val products = ListBuffer(
    Product(1, "Laptop", 3000.0, 1),  // Elektronika
    Product(2, "Smartphone", 2000.0, 1),  // Elektronika
    Product(3, "Tablet", 1500.0, 1),  // Elektronika
    Product(4, "Telewizor", 2500.0, 2),  // RTV
    Product(5, "Lodówka", 5000.0, 3) // AGD
  )

  def getAll = Action {
    Ok(Json.toJson(products))
  }

  def getById(id: Int) = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound(Json.obj("error" -> "Product not found"))
    }
  }

  def getByCategory(categoryId: Int) = Action {
    val filteredProducts = products.filter(_.categoryId == categoryId)
    Ok(Json.toJson(filteredProducts))
  }

  def add = Action(parse.json) { request =>
    request.body.validate[Product] match {
      case JsSuccess(newProduct, _) =>
        products += newProduct
        Created(Json.toJson(newProduct))
      case JsError(errors) =>
        BadRequest(Json.obj("error" -> "Invalid JSON"))
    }
  }

  def update(id: Int) = Action(parse.json) { request =>
    request.body.validate[Product] match {
      case JsSuccess(updatedProduct, _) =>
        products.indexWhere(_.id == id) match {
          case -1 => NotFound(Json.obj("error" -> "Product not found"))
          case index =>
            products.update(index, updatedProduct)
            Ok(Json.toJson(updatedProduct))
        }
      case JsError(errors) =>
        BadRequest(Json.obj("error" -> "Invalid JSON"))
    }
  }

  def delete(id: Int) = Action {
    products.indexWhere(_.id == id) match {
      case -1 => NotFound(Json.obj("error" -> "Product not found"))
      case index =>
        products.remove(index)
        NoContent
    }
  }
}

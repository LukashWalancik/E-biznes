package controllers

import play.api.mvc._
import play.api.libs.json._
import javax.inject._
import scala.collection.mutable.ListBuffer
import models.CartItem

@Singleton
class CartController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val cart = ListBuffer[CartItem]()

  def getCart = Action {
    Ok(Json.toJson(cart))
  }

  def addToCart = Action(parse.json) { request =>
    request.body.validate[CartItem] match {
      case JsSuccess(item, _) =>
        cart += item
        Created(Json.toJson(item))
      case JsError(errors) =>
        BadRequest(Json.obj("error" -> "Invalid JSON"))
    }
  }

  def updateCartItem(productId: Int) = Action(parse.json) { request =>
    request.body.validate[CartItem] match {
      case JsSuccess(updatedItem, _) =>
        cart.indexWhere(_.productId == productId) match {
          case -1 => NotFound(Json.obj("error" -> "Item not found"))
          case index =>
            cart.update(index, updatedItem)
            Ok(Json.toJson(updatedItem))
        }
      case JsError(_) =>
        BadRequest(Json.obj("error" -> "Invalid JSON"))
    }
  }

  def removeFromCart(productId: Int) = Action {
    cart.indexWhere(_.productId == productId) match {
      case -1 => NotFound(Json.obj("error" -> "Item not found"))
      case index =>
        cart.remove(index)
        NoContent
    }
  }
}

package controllers

import play.api.mvc._
import javax.inject._

@Inject
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  def getAll = Action {
    val products = List("Laptop", "Smartphone", "Tablet")
    Ok(products.mkString(", "))
  }
}
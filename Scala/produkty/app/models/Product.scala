package models

import play.api.libs.json._

case class Product(id: Int, name: String, price: Double, categoryId: Int)

object Product {
  implicit val productFormat: OFormat[Product] = Json.format[Product]
}
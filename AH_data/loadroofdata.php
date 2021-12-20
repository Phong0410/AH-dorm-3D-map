<?php
include_once 'config.php';

header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ERROR | E_PARSE);

$block;
$conn = new mysqli($servername.":".$port, $username, $password, $dbname);


$conn->set_charset("utf8");

$body->type = "FeatureCollection";
$body->generator = "smartcity";
$body->copyright = "Smartcity";
$body->timestamp = "2021-05-27T09:28:58Z";
$body->features = [];

$body_result = $conn->query("SELECT * FROM Body WHERE type='roof'");

while ($body_row = $body_result->fetch_assoc()) {
    $object->type = "Feature";
    $object->properties->Name = $body_row['NAME'];
    $object->properties->height = intval($body_row['height']);
    $object->properties->idb = $body_row['id_body'];
    $object->properties->infor = $body_row['infor'];
    $object->geometry->type = "Polygon";
    $object->geometry->coordinates = [];
    $object->id = $body_row['id_body'];
    $array_node = [];

    $node_result = $conn->query("SELECT * FROM ((Body_Face JOIN Face ON Body_Face.id_face = Face.id_Face) JOIN Face_Node ON Face.id_face = Face_Node.id_face) JOIN Node ON Node.id_node = Face_Node.id_node WHERE Body_Face.id_body = '" . $body_row['id_body'] . "' ORDER BY Face_Node.sequence");
    while ($node_row = $node_result->fetch_assoc()) {
        array_push($array_node, [floatval($node_row['x']), floatval($node_row['y']), floatval($node_row['z'])]);
    }
    array_push($object->geometry->coordinates, $array_node);
    array_push($body->features, $object);
    unset($object);
}

echo json_encode($body, JSON_UNESCAPED_UNICODE);

$conn->close();
?>
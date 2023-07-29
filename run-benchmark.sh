#!/bin/bash

base_url="http://localhost:5000/"
array_param=${2:-""} 
url=$base_url$array_param
duration="10s"
threads="12"
connections="400"

output_file=${1:-output.csv}


run_benchmark () {
  local test_name=$1
  total_rps=0
  total_latency=0

  for i in {1..4}
  do
      echo "Running $test_name test $i"
      output=$(wrk -t$threads -c$connections -d$duration $url)

      rps=$(echo "$output" | awk '/Requests\/sec/ {print $2}')
      latency=$(echo "$output" | awk '/Latency/ {print $2}')

      echo "Requests per second: $rps, Latency: $latency"

      total_rps=$(echo $total_rps $rps | awk '{print $1 + $2}')
      total_latency=$(echo $total_latency $latency | awk '{print $1 + $2}')
  done

  avg_rps=$(echo $total_rps | awk '{print $1 / 4}')
  avg_latency=$(echo $total_latency | awk '{print $1 / 4}')

  cd ..

  if [ ! -f $output_file ]; then
      echo "Test,Requests per Second,Latency" >> $output_file
  fi

  echo "$test_name,$avg_rps,$avg_latency" >> $output_file
}

run_test () {
  local folder_name=$1
  local start_command=$2
  local test_name=$3

  echo "------------------$test_name------------------"
  cd $folder_name

  pm2 start $start_command --name test-server --silent

  sleep 5

  wrk -t$threads -c$connections -d$duration $url > /dev/null

  run_benchmark $test_name

  pm2 stop test-server --silent
  pm2 delete test-server --silent
}

run_test "node-express" "./start.sh" "Express"
run_test "node-fastify" "./start.sh" "Fastify"
run_test "deno" "./start.sh" "Deno"
run_test "bun" "./start.sh" "Bun"

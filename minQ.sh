#!/bin/sh

#获取当前脚本所在目录
work_path=$(cd "$(dirname "$0")";pwd) 

#echo $work_path

#run youdaodict
(/home/chen/.virtualenvs/env/bin/python3 ${work_path}"/main.py" > /dev/null 2> /dev/null &)
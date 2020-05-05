---
title: "[백준] 1681 : 줄 세우기"
date: "2020-05-05"
layout: post
draft: false
path: "/posts/baekjoons/1681/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1681번 문제 : 줄 세우기"
---

# 1681번 : 줄 세우기

👉 [문제 바로가기](https://www.acmicpc.net/problem/1681)


## 배경 지식
 - `브루트 포스(Brute Force)` : 완전탐색 알고리즘; **가능한 모든 경우의 수를 모두 탐색**하는 알고리즘


## 푼 방법
브루트 포스 알고리즘(Brute Force Algorithm)은 **매우 단순무식한 알고리즘**이다. 가능한 모든 경우를 다 체크해서 문제를 해결하는 방식인데, 이 문제에서 주어진 N의 범위가 크지 않고 시간복잡도도 O(n)이여서 쓰게 되었다.

문제 해결법은 매우 쉽다. **1부터 시작하여 숫자 L이 들어가지 않은 양의 정수를 찾으면 라벨을 할당받은 학생 수를 +1씩 추가**한다. 그렇게 학생이 모든 학생이 라벨을 할당 받으면 **마지막 학생이 받은 라벨 숫자를 출력한다.**


## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <string>

int main() {
	int n, num = 0;
	char l;
	
	std::cin >> n >> l;
	
	for (int i = 0; i < n; ++i)
		while(std::to_string(++num).find(l) != std::string::npos) ;
	
	std::cout << num << std::endl;
    
	return 0;
}
~~~
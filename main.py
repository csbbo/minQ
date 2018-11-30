#!usr/bin/python3
# -*- coding:utf-8 -*-

from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
from PyQt5.QtWebEngineWidgets import *

import sys

class MainWindow(QMainWindow):
	def __init__(self):
		super().__init__()

		self.initUI()

	def initUI(self):
		self.setWindowTitle("有道minQ")
		self.resize(760,520)
		# self.setFixedSize(760,520)
		self.center()

		self.page = QWebEngineView(self)
		url = "file://"+sys.path[0]+'/dict.html'
		print(url)
		self.page.load(QUrl(url))
		self.setCentralWidget(self.page)


	def center(self):
		screen = QDesktopWidget().screenGeometry()
		size = self.geometry()
		self.move((screen.width()-size.width())/2,(screen.height()-size.height())/2)

if __name__ == '__main__':
	app = QApplication(sys.argv)
	win = MainWindow()
	win.show()
	sys.exit(app.exec_())